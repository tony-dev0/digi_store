import express from "express";
import overviewContent from "../controllers/overviewCtrl.js";
import { verifyToken } from "../controllers/userAuth.js";

const router = express.Router();

// Get Overview Content
router.get("/", verifyToken, overviewContent);

export default router;
