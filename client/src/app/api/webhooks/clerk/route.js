import { createUser } from "@/libs/actions/user.action";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not set in environment variables.");
    return NextResponse.error({
      status: 500,
      statusText: "Webhook secret is not configured.",
    });
  }

  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
    console.error("Missing required Svix headers.");
    return NextResponse.error({
      status: 400,
      statusText: "Invalid Svix webhook headers.",
    });
  }

  const body = await req.text();
  const webhook = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = webhook.verify(body, svixHeaders);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.error({
      status: 401,
      statusText: "Unauthorized webhook request.",
    });
  }

  const { id, type: eventType, data } = evt;

  try {
    if (eventType === "user.created") {
      const { email_addresses, image_url, username } = data;
      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        userName: username || null,
        photo: image_url || null,
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: { userId: newUser.id },
        });
        return NextResponse.json({ message: "User created successfully", user: newUser });
      } else {
        await clerkClient.users.deleteUser(id);
        console.error("Failed to save user in the database.");
        return NextResponse.error({
          status: 400,
          statusText: "Database error: User creation failed.",
        });
      }
    } else {
      console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error handling ${eventType} event:`, error);
    return NextResponse.error({
      status: 500,
      statusText: `Server error handling ${eventType} event.`,
    });
  }

  return NextResponse.json({ message: "Webhook processed successfully." });
}
