import db from "../utils/connection.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log("userName", userName);
  if (
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    !userName ||
    userName === ""
  ) {
    return next(errorHandler(200, "All fields are required!!"));
  }
  try {
    // Check if the email already exists
    // const isEmailDuplicate = await checkEmailExists(email);
    // console.log("isEmailDuplicate", isEmailDuplicate);
    // if (isEmailDuplicate.length > 0) {
    //   return next(errorHandler(200, "Email already exists"));
    // }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Insert the new
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const addedUser = await newUser.save();
    console.log(addedUser);
    // Omit password from the response
    const { password: pass, ...rest } = addedUser;
    const token = jwt.sign(
      { userId: addedUser.userId, isAdmin: addedUser.isAdmin },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.error("Error:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(200, "All fields are required"));
  }
  db.getConnection(async (err, connection) => {
    if (err) throw err;

    await checkEmailExists(email, connection)
      .then((userData) => {
        if (userData.length !== 1) {
          return next(errorHandler(200, "Invalid usernme or password"));
        } else {
          let validUser = userData[0];
          const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
          );
          if (!validPassword) {
            return next(errorHandler(200, "Invalid password"));
          }
          const token = jwt.sign(
            { userId: validUser.userId, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET
          );
          const { password: pass, ...rest } = validUser;
          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .json(rest);
        }
      })
      .finally(() => {
        connection.release();
      });
  });
};
export const signout = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const { password, userName, profileImg } = req.body;
  let hashPassword;
  if (req.user.userId.toString() !== req.params.userId) {
    return next(errorHandler(200, "You are not allowed to update this user!!"));
  }
  if (password || password === "") {
    if (password.length < 6) {
      return next(errorHandler(200, "Password must be at least 6 characters"));
    }
    hashPassword = bcryptjs.hashSync(password, 10);
  }

  const updatedUser = await updateExistingUser({
    userId: req.user.userId,
    password: hashPassword,
    userName,
    profileImg,
  });
  const { password: pass, ...rest } = updatedUser;
  res.status(200).json(rest);
};
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.userId.toString() !== req.params.userId) {
    return next(errorHandler(200, "You are not allowed to delete this user"));
  }
  const query = "DELETE FROM users WHERE userId = ?";
  db.query(query, [req.params.userId], (error) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json("User has been deleted");
    }
  });
};
function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        let result = Object.values(JSON.parse(JSON.stringify(results)));
        resolve(result);
      }
    });
  });
}
function insertUser({ userName, email, password }) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)";
    db.query(query, [userName, email, password], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const insertedUserId = results.insertId;
        // Fetch the newly inserted user details
        const getUserQuery = "SELECT * FROM users WHERE userId = ?";
        db.query(
          getUserQuery,
          [insertedUserId],
          (getUserError, getUserResults) => {
            if (getUserError) {
              reject(getUserError);
            } else {
              const insertedUser = getUserResults[0];
              resolve(insertedUser);
            }
          }
        );
      }
    });
  });
}
function updateExistingUser({ userId, password, userName, profileImg }) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE users
      SET 
        userName = COALESCE(?, userName),
        password = COALESCE(?, password),
        profilePicture = COALESCE(?, profilePicture)
      WHERE userId = ?;
    `;
    db.query(query, [userName, password, profileImg, userId], (error) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        const getUserQuery = "SELECT * FROM users WHERE userId = ?";
        db.query(getUserQuery, [userId], (getUserError, getUserResults) => {
          if (getUserError) {
            reject(getUserError);
          } else {
            const insertedUser = getUserResults[0];
            resolve(insertedUser);
          }
        });
      }
    });
  });
}
export const getAllUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(200, "You are not allowed"));
  }
  const query = "SELECT * FROM users";
  db.query(query, (error, result) => {
    if (error) {
      return next(errorHandler(200, error));
    } else {
      res.status(200).json(result);
    }
  });
};
