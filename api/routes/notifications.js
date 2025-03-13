import express from "express";

import { 
    getRevNotifications,
    storeRevNotification,
    deleteRevNotification,
    getSentNotifications,
    storeSentNotification,
    getSpecificNotifications,
    deleteSentNotification,
    removeRecipient } from "../controllers/notificationCtrl.js";

const router = express.Router();

router.get("/in", getRevNotifications);

router.post("/in", storeRevNotification);

router.delete("/in/:id", deleteRevNotification);

router.get("/out", getSentNotifications);

router.post("/out", storeSentNotification);

router.get("/out/:email", getSpecificNotifications);

router.put("/out/:id", removeRecipient);

router.delete("/out/:id", deleteSentNotification);

export default router;