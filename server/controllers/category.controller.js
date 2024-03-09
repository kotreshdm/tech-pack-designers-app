import { errorHandler } from "../utils/error.js";
import db from "../utils/connection.js";

export const create = async (req, res, next) => {
  const { name, description, slug } = req.body;
  let newName = name.trim();
  const createdBy = req.user.userId;
  if (!name || newName === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if the email already exists
    const isCategorylDuplicate = await checkCategoryExists(slug);
    if (isCategorylDuplicate) {
      return res.status(400).json("Category already exists");
    }
    // Insert the new Category
    const user = await insertCategory({
      name: newName,
      description,
      slug,
      createdBy,
    });
    res.status(200).json("Category careated");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
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

function insertCategory({ name, description, slug, createdBy }) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO category (name, description, slug, createdBy) VALUES (?,?, ?, ?)";
    db.query(query, [name, description, slug, createdBy], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export const deleteCtegory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this Category")
    );
  }
  const query = "DELETE FROM category WHERE categoryId = ?";
  db.query(query, [req.params.categoryId], (error, result) => {
    if (error) {
      console.error("Error:", error);
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
    console.log(result);
    if (error) {
      console.error("Error:", error);
    } else {
      res.status(200).json(result);
    }
  });
};

export const update = async (req, res, next) => {
  const { name, description, slug, categoryId } = req.body;
  let newName = name.trim();
  const createdBy = req.user.userId;
  if (!name || newName === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if the email already exists
    const isCategorylDuplicate = await checkCategoryExistsUpdate(
      slug,
      categoryId
    );
    if (isCategorylDuplicate) {
      return res.status(400).json("Category already exists");
    }
    // Insert the new Category
    const user = await updateCategory({
      categoryId,
      name: newName,
      description,
      slug,
      createdBy,
    });
    res.status(200).json("Category careated");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
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

function updateCategory({ name, description, slug, createdBy, categoryId }) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE category SET name = ?, description = ?, slug = ?, createdBy = ? WHERE categoryId = ?";
    db.query(
      query,
      [name, description, slug, createdBy, categoryId],
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
