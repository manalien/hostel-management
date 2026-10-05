// backend/routes/leaveRoutes.js
import express from "express";
import { applyLeave, getLeavesByRollNo } from "../controllers/leaveController.js";

const router = express.Router();

router.post("/", applyLeave);
router.get("/:rollNo", getLeavesByRollNo);

export default router;
