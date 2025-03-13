import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/userCtrl.js";

const router = express.Router();

router.get("/", getUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

// ***********admin**********
// delete a user
// update a user info
// get all users

export default router;