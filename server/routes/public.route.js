import { Router } from "express";
import {
  getAllPosts,
  getAllCategories,
} from "../controllers/public.controller.js";
const router = Router();
router.get("/posts", getAllPosts);
router.get("/categories", getAllCategories);
export default router;
