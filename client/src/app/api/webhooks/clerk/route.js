import { createUser } from "@/libs/actions/user.action";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing from environment variables.");
    return NextResponse.error({
      status: 500,
      statusText: "Webhook secret not configured.",
    });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers.");
    return NextResponse.error({
      status: 400,
      statusText: "Invalid webhook headers.",
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.error({
      status: 401,
      statusText: "Unauthorized webhook",
    });
  }

  const { id, type: eventType } = evt;

  try {
    if (eventType === "user.created") {
      const { email_addresses, image_url, username } = evt.data;
      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        userName: username || null,
        photo: image_url || null,
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            userId: newUser.id,
          },
        });
      } else {
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
