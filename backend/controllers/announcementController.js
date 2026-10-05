import db from "../db.js";

export const getAnnouncements = (req, res) => {
  const sql = `
    SELECT Announcement_id AS id,
           Title,
           Description,
           Announcement_time
    FROM Announcement
    ORDER BY Announcement_time DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });

    const announcements = rows.map((row) => ({
      id: row.id,
      title: row.Title,
      content: row.Description,
      date: new Date(row.Announcement_time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    res.json(announcements);
  });
};
