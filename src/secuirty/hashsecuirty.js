import { genSalt } from "bcrypt";

export const generateHash = async ({
  plaintext,
  salt = SALT_ROUND,
  minor = "b",
} = {}) => {
  const genratedsalt = await genSalt(salt, minor);
  return await hash(plaintext,genratedsalt);
};
