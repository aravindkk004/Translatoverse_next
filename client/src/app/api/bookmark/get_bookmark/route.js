import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await connectToDb();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ status: 401 });
    }
    return NextResponse.json(user.Bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
