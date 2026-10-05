import express from "express";
import { getRecentActivity } from "../controllers/activityController.js";

const router = express.Router();

router.get("/:roll_no", getRecentActivity);

export default router;
