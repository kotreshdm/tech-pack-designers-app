import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    createdBy: { type: String },
    catBanner: { type: String },
  },
  { timestamp: true }
);
const Category = mongoose.model("category", categorySchema);
export default Category;
