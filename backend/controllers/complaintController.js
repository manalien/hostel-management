import db from "../db.js";

// Generate complaint ID in JS
function generateComplaintId() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit
}

export const fileComplaint = (req, res) => {
  const { roll_no, room_no, description } = req.body;

  if (!roll_no || !room_no || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const complaintId = generateComplaintId();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const sql = `
    INSERT INTO Complaint 
    (Complaint_id, Description, Room_no, Roll_no, Status, Date_of_complaint)
    VALUES (?, ?, ?, ?, 'Pending', ?)
  `;

  db.query(
    sql,
    [complaintId, description, room_no, roll_no, today],
    (err, result) => {
      if (err) {
        console.error("Complaint insert error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Complaint filed successfully",
        complaintId,
      });
    }
  );
};

export const getStudentComplaints = (req, res) => {
  const { rollNo } = req.params;

  const sql = `
    SELECT Complaint_id, Description, Room_no, Status, Date_of_complaint
    FROM Complaint
    WHERE Roll_no = ?
    ORDER BY Date_of_complaint DESC
  `;

  db.query(sql, [rollNo], (err, rows) => {
    if (err) {
      console.error("Complaint fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const formatted = rows.map((c) => ({
      id: c.Complaint_id,
      roomNo: c.Room_no,
      description: c.Description,
      status: c.Status,
      date: c.Date_of_complaint,
    }));

    res.json(formatted);
  });
};
