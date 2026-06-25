import express from "express";
import {
  getOrders,
  createOrders,
  getAllOrders,
  closeOrder,
  deleteOrder,
} from "../controllers/orderCtrl.js";
import { verifyToken, authorize } from "../controllers/userAuth.js";

const router = express.Router();
// authorize all to be admin except delete order only owner can do that

router.post("/", verifyToken, authorize(["admin", "owner"]), createOrders);

router.get("/:id", verifyToken, getOrders);

router.get("/", verifyToken, getAllOrders);

router.put("/:id", verifyToken, authorize(["admin", "owner"]), closeOrder);

router.delete("/:id", verifyToken, authorize(["owner"]), deleteOrder);

export default router;
