import express from "express";
import {
  getUser,
  getConnections,
  addConnection,
  search,
  putMessage,
  getMessages,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { verify } from "jsonwebtoken";

const router = express.Router();

// Read
router.get("/search", search);
router.get("/:id", verifyToken, getUser);
router.get("/:id/connections", verifyToken, getConnections);
router.get("/:id/:connectionId", verifyToken, addConnection);
router.get("/:id/:connectionId/sendMessage", verifyToken, putMessage);
router.get("/:id/:connectionId/getMessage", verifyToken, getMessages);

export default router;
