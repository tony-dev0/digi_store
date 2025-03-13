import express from "express";
import { login, register, google, findemail, logout, verifyuser } from "../controllers/userAuth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/google", google);

router.get('/findemail', findemail);

router.post('/logout', logout);

router.get("/checkauth", verifyuser);

// *******auth user********
// delete self
// update self info

// ***********admin only**********
// delete a user
// update a user info
// get all users
// find a user

export default router;