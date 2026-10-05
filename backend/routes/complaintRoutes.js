import express from "express";
import { fileComplaint, getStudentComplaints } from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", fileComplaint);
router.get("/:rollNo", getStudentComplaints);

export default router;
