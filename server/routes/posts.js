import express from "express";
import { getUserPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id/posts", verifyToken, getUserPosts);

export default router;
