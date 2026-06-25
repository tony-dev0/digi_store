import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/userCtrl.js";
import { verifyToken, authorize } from "../controllers/userAuth.js";

const router = express.Router();

router.get("/", verifyToken, authorize(["admin", "owner"]), getUsers);

router.put("/:id", verifyToken, authorize(["admin", "owner"]), updateUser);

router.delete("/:id", verifyToken, authorize(["owner"]), deleteUser);

export default router;
