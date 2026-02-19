import { Router } from "express";
import { successRes } from "../../utils/res.handle.js";
import { userModel } from "../../db/models/user.models.js";
const router = Router();
router.get("/user", async (req, res, next) => {
  try {
    const users = await userModel.find({ isDeleted: false });
    return successRes({
      res,
      data: users,
      status: 200,
      count: users.length,
    });
  } catch (error) {}
});

export default router;
