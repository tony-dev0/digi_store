import express from "express";

import {
  getRevNotifications,
  deleteRevNotification,
  deleteSentNotification,
  removeRecipient,
  getSpecificNotifications,
  storeRevNotification,
  storeSentNotification,
  getSentNotifications,
} from "../controllers/notificationCtrl.js";
import { verifyToken, authorize } from "../controllers/userAuth.js";
const router = express.Router();

router.post("/", verifyToken, storeRevNotification);

router.post("/out", verifyToken, storeSentNotification);

router.get("/in", verifyToken, getRevNotifications);

router.get("/out", verifyToken, getSentNotifications);

router.get("/out/:email", verifyToken, getSpecificNotifications);

router.put(
  "/out/:id",
  verifyToken,
  authorize(["admin", "owner"]),
  removeRecipient,
);

router.delete(
  "/out/:id",
  verifyToken,
  authorize(["admin", "owner"]),
  deleteSentNotification,
);

router.delete(
  "/in/:id",
  verifyToken,
  authorize(["admin", "owner"]),
  deleteRevNotification,
);

export default router;
