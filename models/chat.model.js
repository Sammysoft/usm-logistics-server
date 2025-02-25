import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Account" },
    reciever: { type: Schema.Types.ObjectId, ref: "Account" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ChatModel = model("Chats", chatSchema);
