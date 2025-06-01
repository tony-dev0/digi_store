import express from "express";
import {
  getOrders,
  createOrders,
  getAllOrders,
  closeOrder,
  deleteOrder,
} from "../controllers/orderCtrl.js";

const router = express.Router();

router.post("/", createOrders);

router.get("/:id", getOrders);

router.get("/", getAllOrders);

router.put("/:id", closeOrder);

router.delete("/:id", deleteOrder);

export default router;
