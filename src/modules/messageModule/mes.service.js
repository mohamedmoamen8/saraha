// import * as messageRepo from "./mes.repo.js";
// import { errorRes } from "../../utils/resHandler.js";

// export const sendMessageService = async (data) => {
//   const { receiverId, content } = data;

//   if (!receiverId || !content) {
//     errorRes({
//       message: "receiverId and content are required",
//       status: 400,
//     });
//   }

//   const message = await messageRepo.createMessage(data);

//   return { data: message };
// };

// export const getUserMessagesService = async (userId) => {
//   if (!userId) {
//     errorRes({
//       message: "userId is required",
//       status: 400,
//     });
//   }

//   const messages = await messageRepo.findUserMessages(userId);

//   return { data: messages };
// };
