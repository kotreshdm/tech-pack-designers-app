import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";
import {
  signup,
  signin,
  signout,
  updateUser,
  deleteUser,
  getAllUser,
} from "../controllers/user.controller.js";

router.get("/allusers", verifyToken, getAllUser);
router.post("/sign-up", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
