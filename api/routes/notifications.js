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

const router = express.Router();

router.post("/", storeRevNotification);

router.post("/out", storeSentNotification);

router.get("/in", getRevNotifications);

router.get("/out", getSentNotifications);

router.get("/out/:email", getSpecificNotifications);

router.put("/out/:id", removeRecipient);

router.delete("/out/:id", deleteSentNotification);

router.delete("/in/:id", deleteRevNotification);

export default router;
