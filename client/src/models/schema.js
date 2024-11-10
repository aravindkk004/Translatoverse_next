import mongoose from "mongoose";

const historyStoring = new mongoose.Schema(
  {
    translation_type: {
      type: String,
      required: true,
    },
    destination_language: {
      type: String,
      required: true,
    },
    outputText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookmarkStoring = new mongoose.Schema(
  {
    translation_type: {
      type: String,
    },
    destination_language: {
      type: String,
    },
    inputText: {
      type: String,
      required: false,
    },
    file_url: {
      type: String,
      required: false,
      default: "",
    },
    outputText: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    Translation_history: [historyStoring],
    Bookmarks: [bookmarkStoring],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
