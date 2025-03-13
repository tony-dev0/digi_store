import express from "express";
import { mailClient } from "../controllers/mailCtrl.js";

const router = express.Router();

router.post("/", mailClient);

export default router;
