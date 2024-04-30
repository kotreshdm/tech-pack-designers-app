import { errorHandler } from "../utils/error.js";
import db from "../utils/connection.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const [categories, allUsers, posts] = await Promise.all([
      listAllCategories(),
      getAllUsers(),
      getPublishedPosts(),
    ]);
    const postWithUserNamAndCategory = posts.map((post) => {
      const catName = categories.find(
        (cat) => cat.categoryId === post.categoryId
      );
      const user = allUsers.find((user) => user.userId === post.createdBy);
      return {
        ...post,
        categoryName: catName ? catName.name : null,
        categorySlug: catName ? catName.slug : null,
        userName: user ? user.userName : null,
        userProfilePicture: user ? user.profilePicture : null,
      };
    });
    res.status(200).json(postWithUserNamAndCategory); // Sending the mapped posts to the client
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

const listAllCategories = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM category";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM posts WHERE status='Published' ORDER BY postId DESC";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
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
