import express from "express";
import { getOrders, createOrders } from "../controllers/orderCtrl.js";

const router = express.Router();

router.post("/", createOrders);

router.get("/:id", getOrders);

export default router;
