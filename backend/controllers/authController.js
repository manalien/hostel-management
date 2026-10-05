import db from "../db.js";
export const login = (req, res) => {
  const { id, password, userType } = req.body;

  if (!id || !password || !userType) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (userType === "student") {
    const query = `
      SELECT s.Roll_no, s.Name, s.Branch, s.Course, s.Room_no, s.Email, s.Ph_no
      FROM STUDENT_LOGIN sl
      JOIN STUDENT s ON sl.Roll_no = s.Roll_no
      WHERE sl.Roll_no = ? AND sl.Password = ?
    `;

    db.query(query, [id, password], (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (!rows.length)
        return res.status(401).json({ message: "Invalid credentials" });

      const s = rows[0];
      return res.json({
        token: "student-" + Date.now(),
        user: {
          roll_no: s.Roll_no,
          name: s.Name,
          branch: s.Branch,
          course: s.Course,
          room_no: s.Room_no,
          email: s.Email,
          phone: s.Ph_no,
          userType: "student",
        },
      });
    });
    return ;
  }
  return res.status(400).json({ message: "Invalid user type" });
};
