import express from "express";
import { getFeeHistory, getFeeSummary } from "../controllers/feesController.js";

const router = express.Router();

// Fee summary (top left boxes)
router.get("/summary/:roll_no", getFeeSummary);

// Payment history (right scrollable list)
router.get("/history/:roll_no", getFeeHistory);

export default router;
