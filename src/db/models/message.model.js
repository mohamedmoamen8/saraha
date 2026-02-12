import mongoose from "mongoose";
import { trim } from "validator";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model("Message", messageSchema);
