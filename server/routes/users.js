import express from "express";
import { getUser, getUserPets, addPet } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/pets", verifyToken, getUserPets);

//Write
// router.patch("/:id/buy/:petId", verifyToken, buyPet);

export default router;
