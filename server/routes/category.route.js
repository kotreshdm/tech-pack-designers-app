import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  update,
  deleteCtegory,
  listAll,
} from "../controllers/category.controller.js";

const router = Router();

router.post("/create", verifyToken, create);
router.put("/update", verifyToken, update);
router.get("/listAll", verifyToken, listAll);
router.delete("/delete/:categoryId", verifyToken, deleteCtegory);

export default router;
