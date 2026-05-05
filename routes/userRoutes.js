import express from "express";

const router = express.Router();

import {userProfile} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

// get protected Profile
router.get("/profile", protect, userProfile);

export default router;