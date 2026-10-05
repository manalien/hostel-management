import db from "../db.js";

// GET Payment and Dues History
export const getFeeHistory = (req, res) => {
    const roll_no = req.params.roll_no;

    const query = `
        SELECT 
            Fee_id AS id,
            Fee_title AS description,
            Fee_amount AS amount,
            DATE_FORMAT(Fee_date, '%b %d, %Y') AS date,
            Status AS status,
            CASE 
                WHEN Status = 'Paid' THEN 'Payment'
                ELSE 'Charge'
            END AS type
        FROM FEES
        WHERE Roll_no = ?
        ORDER BY Fee_date DESC;
    `;

    db.query(query, [roll_no], (err, result) => {
        if (err) {
            console.error("Error fetching fee history:", err);
            return res.json([]);
        }
        res.json(result);
    });
};


// GET Fee Summary
export const getFeeSummary = (req, res) => {
    const roll_no = req.params.roll_no;

    const query = `
        SELECT
            SUM(CASE WHEN Status = 'Paid' THEN Fee_amount ELSE 0 END) AS totalPaid,
            SUM(Fee_amount) AS totalDues,
            SUM(CASE WHEN Status = 'Due' THEN Fee_amount ELSE 0 END) AS outstanding,
            DATE_FORMAT(
                (SELECT MIN(Fee_date) FROM FEES WHERE Roll_no = ? AND Status = 'Due'),
                '%b %d, %Y'
            ) AS dueDate
        FROM FEES
        WHERE Roll_no = ?;
    `;

    db.query(query, [roll_no, roll_no], (err, result) => {
        if (err) {
            console.error("Error fetching fee summary:", err);
            return res.json(null);
        }

        // handle case where no records exist
        if (!result || result.length === 0) {
            return res.json({
                totalPaid: 0,
                totalDues: 0,
                outstanding: 0,
                dueDate: "N/A"
            });
        }

        res.json(result[0]);
    });
};


