import db from "../db.js";

export const getRecentActivity = (req, res) => {
  const { roll_no } = req.params;

  const query = `
    SELECT 
      'Complaint' AS type,
      Complaint_id AS id,
      Description AS title,
      DATE_FORMAT(Date_of_complaint, '%b %d, %Y') AS date,
      Status AS status
    FROM Complaint
    WHERE Roll_no = ?
    
    UNION ALL
    
    SELECT
      'Leave' AS type,
      Leave_id AS id,
      CONCAT('Leave from ', DATE_FORMAT(Leave_from_date, '%b %d'), 
             ' to ', DATE_FORMAT(Leave_to_date, '%b %d')) AS title,
      DATE_FORMAT(Leave_from_date, '%b %d, %Y') AS date,
      Approval_status AS status
    FROM Leave_Application
    WHERE Roll_no = ?

    ORDER BY date DESC
    LIMIT 5;
  `;

  db.query(query, [roll_no, roll_no], (err, results) => {
    if (err) {
      console.error("Activity fetch error:", err);
      return res.json([]); // IMPORTANT: return empty array so .map() doesn't crash
    }

    res.json(results);
  });
};
