"use server";
import User from "@/models/schema";
import { connectToDb } from "@/libs/connect";

export const createUser = async (user) => {
  try {
    await connectToDb();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Failed to create user");
  }
};
