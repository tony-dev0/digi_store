import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteproduct,
} from "../controllers/productCtrl.js";
import { verifyToken, authorize } from "../controllers/userAuth.js";

const router = express.Router();

// authorize all to be admin except delete order only owner can do that

// CREATE
router.post("/", verifyToken, authorize(["admin", "owner"]), createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// FIND AND GET A PRODUCT BY ID
router.get("/:id", getProduct);

// UPDATE
router.put("/:id", verifyToken, authorize(["admin", "owner"]), updateProduct);

// DELETE
router.delete("/:id", verifyToken, authorize(["owner"]), deleteproduct);

export default router;
