import express from "express";
import { mailClient } from "../controllers/mailCtrl.js";
import { verifyToken } from "../controllers/userAuth.js";

const router = express.Router();

router.post("/", verifyToken, mailClient);

export default router;
