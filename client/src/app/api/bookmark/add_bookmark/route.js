import { connectToDb } from "@/libs/connectToDb";
import User from "@/models/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDb();

  const {
    clerkId,
    translation_type,
    destination_language,
    inputText,
    file_url,
    outputText,
  } = await req.json();

  if (!clerkId || !translation_type || !destination_language || !outputText || !inputText) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      console.log("User not found in the database");
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const newBookmark = {
      translation_type,
      destination_language,
      inputText,
      file_url: file_url || "",
      outputText,
    };

    console.log("New Bookmark to add:", newBookmark);
    console.log("Bookmarks before push:", user.Bookmarks);

    try {
      user.Bookmarks.push(newBookmark);
      console.log("Before saving the user document");
      await user.save();
      console.log("User document saved successfully");
    } catch (saveError) {
      console.error("Error saving user document:", saveError);
      return NextResponse.json(
        { error: "Failed to save the bookmark." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Bookmark added successfully.", bookmark: newBookmark },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error adding bookmark:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
