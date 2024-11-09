import { createUser } from "@/libs/actions/user.action";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing from environment variables.");
    return new Response("Webhook secret not configured.", { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers.");
    return new Response("Invalid webhook headers.", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Unauthorized webhook", { status: 401 });
  }

  const { id, type: eventType } = evt.data;

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
        return new Response("User creation failed", { status: 400 });
      }

      return new Response(JSON.stringify({ message: "OK", user: newUser }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error(`Error handling ${eventType} event:`, error);
    return new Response(`Error handling ${eventType} event`, { status: 500 });
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
