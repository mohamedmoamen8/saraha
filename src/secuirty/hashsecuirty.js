import "dotenv/config";
import { genSalt, hash } from "bcrypt";

export const generateHash = async ({
  plaintext,
  salt = Number(process.env.SALT_ROUNDS) || 10,
  minor = "b",
} = {}) => {

  const generatedSalt = await genSalt(salt, minor);
  return await hash(plaintext, generatedSalt);

};
