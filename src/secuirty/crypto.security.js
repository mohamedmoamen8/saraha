import crypto from "node:crypto";
const ENCRYPTION_SECRET_KEY = Buffer.from("1234567890qwertyuiopasdfghjklmm");
export const ecrypt = (text) => {
  const iv = crypto.randomBytes(IV_length);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    iv,
  );
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = (encryptedData) => {
  const [iv, encryptedText] = encryptedData.split(":");
  const binaryLikeIv = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_SECRET_KEY,
    binaryLikeIv,
  );
  let decryptData = decipher.update(encryptedText, "hex", "utf-8");
  decryptData += decipher.final("utf-8");
  return decryptData;
};
