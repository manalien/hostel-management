import express from "express";
import {
  getTodayAttendance,
  markTodayAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/today/:rollNo", getTodayAttendance);
router.post("/mark", markTodayAttendance);

export default router;
