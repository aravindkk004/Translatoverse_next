import { clerkClient } from "@clerk/nextjs/server";
import { createUser } from "@/libs/actions/user.action";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { toast } from "react-toastify"; // Replaced with react-toastify

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log("secret", process.env.WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = req.headers;
  const svix_id = headerPayload["svix-id"];
  const svix_timestamp = headerPayload["svix-timestamp"];
  const svix_signature = headerPayload["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook signature manually using crypto
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(svix_id + svix_timestamp + body);
  const computedSignature = hmac.digest("hex");

  if (computedSignature !== svix_signature) {
    console.error("Error verifying webhook signature");
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const { id } = payload.data;
  const eventType = payload.type;

  if (eventType === "user.created") {
    const { id, email_addresses } = payload.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
    };
    console.log("from clerk webhooks", user);
    const newUser = await createUser(user);

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });

      // Use react-toastify for notification
      toast.success("Signup successfully");
    }

    return NextResponse.json({
      message: "user added successfully",
      user: newUser,
    });
  }

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("success", { status: 200 });
}
