import { Message } from "./message.model.js=";

export const createMessage = (data) => {
  return Message.create(data);
};

export const findUserMessages = (userId) => {
  return Message.find({
    receiverId: userId,
    deletedAt: null,
  }).populate("senderId", "username email"); 
};
