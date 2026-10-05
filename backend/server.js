import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import feesRoutes from "./routes/feesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/login", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/fees", feesRoutes);


// START SERVER
app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
