import { errorHandler } from "../utils/error.js";
import Category from "../models/category.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const allUsers = await User.find();
    const posts = await Post.find();

    const enhancedPosts = posts.map((post) => {
      // Find the corresponding category and user
      const catName = categories.find((cat) => cat._id.equals(post.categoryId));
      const user = allUsers.find((user) => user._id.equals(post.createdBy));

      return {
        ...post.toJSON(),
        categoryName: catName ? catName.name : null,
        categorySlug: catName ? catName.slug : null,
        userName: user ? user.userName : null,
        userProfilePicture: user ? user.profilePicture : null,
      };
    });
    res.status(200).json(enhancedPosts);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ updatedAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};
