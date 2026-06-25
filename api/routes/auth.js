import express from "express";
import rateLimiter from "express-rate-limit";
import {
  login,
  register,
  google,
  logout,
  refreshToken,
} from "../controllers/userAuth.js";

const router = express.Router();
const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts, please try again later",
});
router.post("/login", loginLimiter, login);

router.post("/register", register);

router.post("/google", google);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

export default router;
