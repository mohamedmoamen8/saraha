import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env.development"
});


export const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is required", {
        cause: { status: 400 },
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token is required", {
        cause: { status: 400 },
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded; 

    next();
  } catch (error) {
    next(error);
  }
};
