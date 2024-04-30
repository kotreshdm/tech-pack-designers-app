import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postName: {
      type: String,
      required: true,
      unique: true,
    },
    postSlug: {
      type: String,
      required: true,
      unique: true,
    },
    postDescription: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    socialImage: {
      type: String,
    },
    pageTitle: {
      type: String,
    },
    keywords: {
      type: String,
    },
    SEODescription: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    status: {
      type: String,
      default: "Published",
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
