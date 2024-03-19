import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  listAll,
  update,
  deletePost,
  updateDesc,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", verifyToken, create);
router.put("/updateDesc", verifyToken, updateDesc);
router.put("/update", verifyToken, update);
router.get("/listAll", verifyToken, listAll);
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
