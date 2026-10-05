import db from "../db.js";

export const applyLeave = (req, res) => {
  const {
    leave_id,
    roll_no,
    leave_from_date,
    leave_to_date,
    approval_status = "Pending",
    guardian_ph_no,
    address_of_stay,
  } = req.body;
  
  if (
    !leave_id ||
    !roll_no ||
    !leave_from_date ||
    !leave_to_date ||
    !guardian_ph_no ||
    !address_of_stay
  ) {
    console.log("Missing required fields");
    console.log("Incoming leave request body:", req.body);
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO Leave_Application
      (Leave_id, Roll_no, Leave_from_date, Leave_to_date,
       Approval_status, Guardian_ph_no, Address_of_stay)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    leave_id,
    roll_no,
    leave_from_date,
    leave_to_date,
    approval_status,
    guardian_ph_no,
    address_of_stay,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error inserting leave:", err);
      return res.status(500).json({ message: "Database error inserting leave" });
    }

    console.log("Leave inserted with id:", leave_id);
    return res.status(201).json({
      message: "Leave applied successfully",
      leaveId: leave_id,
    });
  });
};

export const getLeavesByRollNo = (req, res) => {
  const { rollNo } = req.params;

  const sql = `
    SELECT
      Leave_id AS id,
      Address_of_stay AS address,
      Approval_status AS status,
      DATE_FORMAT(Leave_from_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(Leave_to_date, '%Y-%m-%d')   AS end_date,
      NULL AS rejection_reason
    FROM Leave_Application
    WHERE Roll_no = ?
    ORDER BY Leave_from_date DESC
  `;

  db.query(sql, [rollNo], (err, rows) => {
    if (err) {
      console.error("Error in getLeavesByRollNo:", err);
      return res.status(500).json({ message: "Database error fetching leaves" });
    }
    return res.json(rows);
  });
};
