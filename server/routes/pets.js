import express from "express";
import { getFeedPets, getUserPets } from "../controllers/pets.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getFeedPets);
router.get("/:id/pets", verifyToken, getUserPets);

export default router;
