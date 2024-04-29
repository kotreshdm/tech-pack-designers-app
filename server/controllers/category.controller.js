import { errorHandler } from "../utils/error.js";
import Category from "../models/category.model.js";

export const create = async (req, res, next) => {
  const { name, description, slug, catBanner } = req.body;
  const createdBy = req.user.userId;
  if (!name) {
    return next(errorHandler(200, "All fields are required"));
  }
  try {
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return next(errorHandler(200, "Category already exists"));
    }
    // Insert the category
    const newCategory = new Category({
      name,
      description,
      slug,
      catBanner,
      createdBy,
    });
    await newCategory.save();
    res.status(200).json(`${name} created successfully...`);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const deleteCtegory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(200, "You are not allowed to delete this user"));
  }
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json("Category deleted!!!");
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ updatedAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const update = async (req, res, next) => {
  const { name, description, slug, categoryId, catBanner } = req.body;
  try {
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory && existingCategory._id !== categoryId) {
      return next(errorHandler(200, "Category slug exists"));
    }
    // Insert the category
    await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
          description,
          slug,
          catBanner,
        },
      },
      { new: true }
    );
    res.status(200).json(`${name} updated successfully...`);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};
