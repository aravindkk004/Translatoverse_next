import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { userId } = getAuth(req);
    await connectToDb();
    const { bookmarkId } = await req.json();
    console.log("bookmark id is", bookmarkId);
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ status: 401, message: "User not found" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $pull: { Bookmarks: { _id: bookmarkId } } },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ status: 404, message: "Bookmark not found" });
    }
    return NextResponse.json({
      status: 200,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete bookmark",
    });
  }
}
