import { errorHandler } from "../utils/error.js";
import db from "../utils/connection.js";

export const create = async (req, res, next) => {
  const { name, description, slug, catBanner } = req.body;
  const createdBy = req.user.userId;
  if (!name) {
    return next(errorHandler(200, "All fields are required"));
  }
  try {
    // Check if the email already exists
    const isCategorylDuplicate = await checkCategoryExists(slug);
    if (isCategorylDuplicate) {
      return next(errorHandler(200, "Category already exists"));
    }
    // Insert the new Category
    const user = await insertCategory({
      name,
      description,
      slug,
      createdBy,
      catBanner,
    });
    res.status(200).json("Category careated");
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(200, error));
  }
};

function checkCategoryExists(slug) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM category WHERE slug = ?";
    db.query(query, [slug], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

function insertCategory({ name, description, slug, catBanner, createdBy }) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO category (name, description, slug,catBanner, createdBy) VALUES (?,?, ?, ?,?)";
    db.query(
      query,
      [name, description, slug, catBanner, createdBy],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

export const deleteCtegory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(200, "You are not allowed to delete this user"));
  }
  const query = "DELETE FROM category WHERE categoryId = ?";
  db.query(query, [req.params.categoryId], (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json("Category has been deleted!");
      } else {
        res.status(200).json("Category does not exist !");
      }
    }
  });
};

export const listAll = async (req, res, next) => {
  const query = "Select * FROM category";
  db.query(query, (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json(result);
    }
  });
};

export const update = async (req, res, next) => {
  const { name, description, slug, categoryId, catBanner } = req.body;

  const createdBy = req.user.userId;
  try {
    // Check if the email already exists
    const isCategorylDuplicate = await checkCategoryExistsUpdate(
      slug,
      categoryId
    );
    if (isCategorylDuplicate) {
      return next(errorHandler(200, "Category already exists"));
    }
    // Insert the new Category
    const user = await updateCategory({
      categoryId,
      name,
      description,
      slug,
      catBanner,
      createdBy,
    });
    res.status(200).json("Category updated");
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(200, error));
  }
};

function checkCategoryExistsUpdate(slug, categoryId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM category WHERE slug = ? AND categoryId != ?";
    db.query(query, [slug, categoryId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

function updateCategory({
  name,
  description,
  slug,
  createdBy,
  categoryId,
  catBanner,
}) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE category
      SET 
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      slug = COALESCE(?, slug),
      createdBy = COALESCE(?, createdBy),
      catBanner = COALESCE(?, catBanner)
      WHERE categoryId = ?;
    `;
    db.query(
      query,
      [name, description, slug, createdBy, catBanner, categoryId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}
