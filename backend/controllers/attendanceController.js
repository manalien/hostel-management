import db from "../db.js";

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export const getTodayAttendance = (req, res) => {
  const { rollNo } = req.params;
  const today = getToday();

  const sql = `
    SELECT Time_marked, Status
    FROM ATTENDANCE
    WHERE Roll_no = ? AND Date = ?
  `;

  db.query(sql, [rollNo, today], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (!rows.length)
      return res.json({ marked: false, timeMarked: null, status: null });

    const r = rows[0];
    res.json({
      marked: true,
      timeMarked: r.Time_marked,
      status: r.Status,
    });
  });
};

export const markTodayAttendance = (req, res) => {
  const { roll_no } = req.body;
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (hour < 12) {
    return res.status(400).json({
      message: "Attendance can only be marked after 8 PM.",
    });
  }

  if (hour >= 22) {
    return res.status(400).json({
      message: "Attendance window closed for today.",
    });
  }

  const today = getToday();
  const timeStr = now.toTimeString().slice(0, 8);

  const check = `
    SELECT Attendance_id FROM ATTENDANCE
    WHERE Roll_no = ? AND Date = ?
  `;

  db.query(check, [roll_no, today], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (rows.length)
      return res.status(400).json({
        message: "Attendance already marked for today.",
      });

    const insert = `
      INSERT INTO ATTENDANCE (Roll_no, Date, Time_marked, Status)
      VALUES (?, ?, ?, 'Present')
    `;

    db.query(insert, [roll_no, today, timeStr], (err2) => {
      if (err2) return res.status(500).json({ message: "DB error" });

      res.json({
        message: "Attendance marked successfully.",
        timeMarked: timeStr,
        status: "Present",
      });
    });
  });
};
