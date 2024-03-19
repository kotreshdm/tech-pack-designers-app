import { errorHandler } from "../utils/error.js";
import db from "../utils/connection.js";

export const getAllPosts = async (req, res, next) => {
  const query =
    "SELECT * FROM posts WHERE status='Published' ORDER BY postId DESC";
  db.query(query, (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json(result);
    }
  });
};
export const getAllCategories = async (req, res, next) => {
  const query = "SELECT * FROM category";
  db.query(query, (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json(result);
    }
  });
};
getAllCategories;
