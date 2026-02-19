import { userModel } from "../../db/models/user.models.js";
import { errorRes } from "../../utils/res.handle.js";
import { generateHash } from "../../secuirty/hashsecuirty.js";
import { findById } from "../../db/models/db.repo.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { expires } from "mongoose/lib/utils.js";
import { sendOTPEmail } from "../../utils/email.js";


dotenv.config({
  path: "./config/.env.development",
});

export const signup = async ({ username, password, email, gender, age }) => {
  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist) {
    errorRes({
      message: "email already exist",
      status: 400,
    });
  }
  const user = await userModel.create({
    username,
    password: await generateHash({ plaintext: password }),
    email,
    age,
    gender,
  });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.emailOtp = otp;
  user.emailOTPExpires = Date.now() + 5 * 60 * 1000; 
  await user.save();
  await await sendOTPEmail(email, otp);

  return {
    data: user,
  };
};

export const login = async ({ email, password }) => {
  const foundUser = await userModel.findOne({ email });
  if (!foundUser || foundUser.password !== password) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      _id: foundUser._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    {
      _id: foundUser._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );
  return { data: accessToken, refreshToken };
};

export const getUserProfile = async ({ id }) => {
  const user = await findById({
    model: userModel,
    id,
  });
  return {
    data: user,
  };
};
