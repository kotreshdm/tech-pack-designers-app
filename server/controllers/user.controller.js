import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
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
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return next(errorHandler(200, "UserName already exists"));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(errorHandler(200, "Email already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Insert the new
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const addedUser = await newUser.save();
    // Omit password from the response
    const { password: pass, ...rest } = addedUser._doc;
    const token = jwt.sign(
      { userId: rest._id, isAdmin: rest.isAdmin },
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

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(errorHandler(200, "Invalid usernme or password..."));
    }

    const validPassword = bcryptjs.compareSync(password, existingUser.password);
    if (!validPassword) {
      return next(errorHandler(200, "Invalid usernme or password.."));
    }

    const { password: pass, ...rest } = existingUser._doc;
    const token = jwt.sign(
      { userId: rest._id, isAdmin: rest.isAdmin },
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
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(200, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(200, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return next(
        errorHandler(200, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.userName.includes(" ")) {
      return next(errorHandler(200, "Username cannot contain spaces"));
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(200, "Username must be lowercase"));
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(200, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profileImg,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    console.log("rest...", rest);
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.userId === req.params.userId) {
    return next(errorHandler(200, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};
