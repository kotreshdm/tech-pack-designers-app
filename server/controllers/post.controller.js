import { errorHandler } from "../utils/error.js";
import db from "../utils/connection.js";

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
  if (!postName) {
    return next(errorHandler(200, "All fields are required"));
  }

  if (!categoryId || categoryId < 0) {
    return next(errorHandler(200, "CategoryId id is required"));
  }
  try {
    // Check if the post already exists
    const isPostDuplicate = await checkPostExists(postSlug);
    if (isPostDuplicate) {
      return next(errorHandler(200, "Post already exists"));
    }
    // Insert the new Post
    const user = await insertPost({
      postName,
      postSlug,
      SEOTitle,
      SEODescription,
      SEOKeywords,
      categoryId,
      createdBy,
    });
    res.status(200).json("Post careated");
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(200, error));
  }
};

function checkPostExists(postSlug) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM posts WHERE postSlug = ?";
    db.query(query, [postSlug], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

function insertPost({
  postName,
  postSlug,
  SEOTitle,
  SEODescription,
  SEOKeywords,
  categoryId,
  createdBy,
}) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO posts (postName,postSlug,SEOTitle,SEODescription,SEOKeywords,categoryId,createdBy) VALUES (?,?,?,?,?,?,?)";
    db.query(
      query,
      [
        postName,
        postSlug,
        SEOTitle,
        SEODescription,
        SEOKeywords,
        categoryId,
        createdBy,
      ],
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

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(200, "You are not allowed to delete this post"));
  }
  const query = "DELETE FROM posts WHERE postId = ?";
  db.query(query, [req.params.postId], (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json("Post has been deleted!");
      } else {
        res.status(200).json("Post does not exist !");
      }
    }
  });
};

export const listAll = async (req, res, next) => {
  const query = "Select * FROM posts";
  db.query(query, (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json(result);
    }
  });
};

export const update = async (req, res, next) => {
  const {
    postName,
    postSlug,
    SEOTitle,
    SEODescription,
    SEOKeywords,
    postId,
    postDescription,
  } = req.body;
  const updatedBy = req.user.userId;

  try {
    // Check if the postis already exists
    const isPostDuplicate = await checkpostExistsUpdate(postSlug, postId);
    if (isPostDuplicate) {
      return next(errorHandler(200, "Category already exists"));
    }
    // Insert the new Category
    const user = await updatepost({
      postName,
      postSlug,
      SEOTitle,
      SEODescription,
      SEOKeywords,
      postId,
      updatedBy,
      postDescription,
    });
    res.status(200).json("Category updated");
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(200, error));
  }
};

function checkpostExistsUpdate(postSlug, postId) {
  console.log(postSlug, postId);
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM posts WHERE postSlug = ? AND postId != ?";
    db.query(query, [postSlug, postId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

function updatepost({
  postName,
  postSlug,
  SEOTitle,
  SEODescription,
  SEOKeywords,
  postDescription,
  postId,
  updatedBy,
}) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE posts
      SET 
      postName = COALESCE(?, postName),
      postSlug = COALESCE(?, postSlug),
      postDescription = COALESCE(?, postDescription),
      SEOTitle = COALESCE(?, SEOTitle),
      SEODescription = COALESCE(?, SEODescription),
      SEOKeywords = COALESCE(?, SEOKeywords),
      updatedBy = COALESCE(?, updatedBy)
      WHERE postId = ?;
    `;
    db.query(
      query,
      [
        postName,
        postSlug,
        postDescription,
        SEOTitle,
        SEODescription,
        SEOKeywords,
        updatedBy,
        postId,
      ],
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
