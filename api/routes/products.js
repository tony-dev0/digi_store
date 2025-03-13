import express from "express";
import { createProduct, 
         getProducts,
         getProduct,
         updateProduct,
         deleteproduct,
        } from "../controllers/productCtrl.js";
const router = express.Router();

// CREATE
router.post("/", createProduct)

//Test
// router.post("/test", test)

// GET ALL PRODUCTS
router.get("/", getProducts)

// FIND AND GET A PRODUCT BY ID
router.get("/:id", getProduct)

// UPDATE
router.put("/:id", updateProduct)

// DELETE
router.delete("/:id", deleteproduct)

export default router;