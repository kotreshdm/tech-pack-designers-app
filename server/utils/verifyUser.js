import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(200, "Session expired logout and login again..."));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(200, "You are Unauthorized"));
    }
    req.user = user;
    next();
  });
};

export const alreadySiginedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    return next(errorHandler(200, "Already signIn"));
  }
  next();
};
