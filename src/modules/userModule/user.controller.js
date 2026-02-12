import { Router } from "express";
import { sayHello, signup } from "./user.service.js";
import { asyncHandler } from "../../utils/catchError.js";
import { Message } from "../../db/models/message.model.js";
const router = Router();

router.post("/signup", async (req, res, next) => {
  const { username, password, email, age, gender } = req.body;
  const { data } = await signup({ username, password, email, gender, age });

  return successRes({
    res,
    data,
    status: 201,
    message: "created",
  });
});
export default router;
