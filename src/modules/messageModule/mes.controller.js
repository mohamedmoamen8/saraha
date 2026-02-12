import { Router } from "express";
import * as messageService from "./mes.service.js";
import { successRes } from "../../utils/res.handle.js";

const router = Router();


router.post("/", async (req, res, next) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const { data } = await messageService.sendMessage({
      senderId,
      receiverId,
      message,
    });

    return successRes({
      res,
      status: 201,
      message: "Message sent",
      data,
    });
  } catch (err) {
    next(err);
  }
});


router.get("/:receiverId", async (req, res, next) => {
  try {
    const { receiverId } = req.params;

    const { data } =
      await messageService.getReceivedMessages(receiverId);

    return successRes({
      res,
      data,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:messageId", async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const { data } =
      await messageService.deleteMessage(messageId);

    return successRes({
      res,
      message: "Message deleted",
      data,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
