import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  const {
    postName,
    postSlug,
    SEOTitle,
    SEODescription,
    SEOKeywords,
    categoryId,
  } = req.body;

  const createdBy = req.user.userId;
  if (!postName || !categoryId) {
    return next(errorHandler(200, "All fields are required"));
  }
  try {
    const existingSlug = await Post.findOne({ postSlug });
    if (existingSlug) {
      return next(errorHandler(200, "Post already exists"));
    }
    // Insert the category
    const newPost = new Post({
      postName,
      postSlug,
      SEOTitle,
      SEODescription,
      SEOKeywords,
      categoryId,
      createdBy,
    });
    await newPost.save();
    res.status(200).json(`${postName} created...`);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(200, "You are not allowed to delete this post"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post deleted!!!");
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const update = async (req, res, next) => {
  const {
    postSlug,
    postId,
    postName,
    SEOTitle,
    SEODescription,
    SEOKeywords,
    bannerImage,
    socialImage,
    categoryId,
    status,
  } = req.body;
  try {
    const existingPost = await Post.findOne({ postSlug });
    console.log(req.body);
    if (existingPost && existingPost._id !== postId) {
      return next(errorHandler(200, "Post slug exists"));
    }
    // Update the existing post
    await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          postSlug,
          postName,
          SEOTitle,
          SEODescription,
          SEOKeywords,
          bannerImage,
          socialImage,
          categoryId,
          status,
        },
      },
      { new: true }
    );
    res.status(200).json(`${postName} updated successfully...`);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const updateDesc = async (req, res, next) => {
  const { postDescription, postId } = req.body;

  const updatedBy = req.user.userId;
  try {
    // Update the existing post description
    await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          postDescription,
          updatedBy,
        },
      },
      { new: true }
    );
    res.status(200).json(`Post updated successfully...`);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};
