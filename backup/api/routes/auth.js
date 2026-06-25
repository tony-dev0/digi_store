import express from "express";
import {
  login,
  register,
  google,
  logout,
  verifyToken,
} from "../controllers/userAuth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/google", google);

router.post("/logout", logout);

// router.post("/refresh-token", refreshToken);

// router.get("/checkauth", verifyToken);

export default router;
