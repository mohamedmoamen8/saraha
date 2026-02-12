import { error } from "node:console";
import { userModel } from "../../db/models/user.models";
import { errorRes, successRes } from "../../utils/res.handle";
import { hash, compare } from "bcrypt";
import { generateHash } from "../../secuirty";
export const signup = async ({ username, password, email, gender, age }) => {
  const isEmailExist = await userModel.findone({ email });
  if (isEmailExist) {
    errorRes({
      message: "email already exist",
      status: 400,
    });
  }
  const user = await userModel.createOne({
    username,
    password: await generateHash({ plaintext: password }),
    email,
    age,
    gender,
  });

  return {
    data: user,
  };
};

export const login = async ({ email, password }) => {
  const foundUser = await user.findOne({ email });
  if (!foundUser || foundUser.password !== password) {
    throw new Error("Invalid credentials");
  }
  return { data: foundUser };
};