import express from "express";
import { getAnnouncements } from "../controllers/announcementController.js";

const router = express.Router();

router.get("/", getAnnouncements);

export default router;
