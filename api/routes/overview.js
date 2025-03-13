import express from "express";
import overviewContent from "../controllers/overviewCtrl.js";

const router = express.Router();

// Get Overview Content
router.get("/", overviewContent);

export default router;