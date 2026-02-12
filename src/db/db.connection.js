import mongoose from "mongoose";
export const DbConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/saraha ")
    .then(() => {
      console.log("sucesss");
    })
    .catch((err) => {
      console.log("fail", err);
    });
};
