// pages/api/webhooks/clerk.js

import { Webhook } from "svix";
import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema"; // Your User schema file
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing from environment variables.");
    return NextResponse.error({
      status: 500,
      statusText: "Webhook secret not configured.",
    });
  }

  const headerPayload = req.headers;
  const svix_id = headerPayload["svix-id"];
  const svix_timestamp = headerPayload["svix-timestamp"];
  const svix_signature = headerPayload["svix-signature"];

  console.log("Received Webhook Request");
  console.log("Svix Headers:", { svix_id, svix_timestamp, svix_signature });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers.");
    return NextResponse.error({
      status: 400,
      statusText: "Invalid webhook headers.",
    });
  }

  const payload = await req.json();
  console.log("Received Webhook Payload:", payload);

  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("Webhook Verified Successfully");
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.error({
      status: 401,
      statusText: "Unauthorized webhook",
    });
  }

  const { id, type: eventType } = evt;
  console.log("Webhook Event:", eventType, "Event ID:", id);

  try {
    if (eventType === "user.created") {
      console.log("Handling user.created event...");

      const { email_addresses, image_url, username } = evt.data;
      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        userName: username || null,
        photo: image_url || null,
      };

      console.log("Extracted User Data:", user);

      const newUser = await createUser(user);
      console.log("User created in MongoDB:", newUser);

      if (newUser) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            userId: newUser.id,
          },
        });
        console.log("User metadata updated in Clerk");
      } else {
        console.error("User creation failed in MongoDB");
        await clerkClient.users.deleteUser(id);
        return NextResponse.error({
          status: 400,
          statusText: "User creation failed",
        });
      }

      return NextResponse.json({ message: "OK", user: newUser });
    }
  } catch (error) {
    console.error(`Error handling ${eventType} event:`, error);
    return NextResponse.error({
      status: 500,
      statusText: `Error handling ${eventType} event`,
    });
  }

  return NextResponse.json({ message: "Webhook processed successfully" });
}

async function createUser(user) {
  try {
    console.log("Connecting to MongoDB...");
    await connect(); // Ensure you're connected to MongoDB
    const newUser = await User.create(user); // Your mongoose user creation logic
    console.log("User created in MongoDB:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user in MongoDB.");
  }
}
