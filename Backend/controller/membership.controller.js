import pool from "../db/db.js";

const calculateEndDate = (months) => {
  const start = new Date();
  start.setMonth(start.getMonth() + months);
  return start.toISOString().split("T")[0];
};

export const addMembership = async (req, res) => {
  const { userId, plan } = req.body;

  if (!userId || !plan) {
    return res
      .status(400)
      .json({ message: "User ID and plan type are required" });
  }

  try {
    let duration = plan === "long-term" ? 3 : plan === "basic" ? 1 : null;

    if (!duration) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const endDate = calculateEndDate(duration);

    await pool.query(
      `UPDATE membership SET is_active = false WHERE user_id = $1 AND is_active = true`,
      [userId]
    );

    const result = await pool.query(
      `INSERT INTO membership (user_id, plan_type, end_date, is_active)
         VALUES ($1, $2, $3, true)
         RETURNING *`,
      [userId, plan, endDate]
    );

    res.status(201).json({
      message: "Membership added successfully",
      membership: result.rows[0],
    });
  } catch (error) {
    console.error("Add membership error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const fetchMembership = async (req, res) => {
    try {
      const userId = req.user.id;

      const query = `
        SELECT * FROM membership
        WHERE user_id = $1 
        ORDER BY start_date DESC 
        LIMIT 1
      `;
  
      const result = await pool.query(query, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(200).json({ membership: null });
      }
  
      res.status(200).json({ membership: result.rows[0] });
    } catch (error) {
      console.error("Error fetching membership:", error);
      res.status(500).json({ message: "Failed to fetch membership" });
    }
  };
  export const skipToday = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const result = await pool.query(
        "SELECT * FROM membership WHERE user_id = $1 AND is_active = true ORDER BY end_date DESC LIMIT 1",
        [userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No active membership found" });
      }
  
      const membership = result.rows[0];
      const currentEndDate = new Date(membership.end_date);
      currentEndDate.setDate(currentEndDate.getDate() + 1);
  
      await pool.query(
        "UPDATE membership SET end_date = $1 WHERE id = $2",
        [currentEndDate, membership.id]
      );
  
      res.status(200).json({ message: "Today's meals skipped and end_date extended by 1 day" });
    } catch (err) {
      console.error("Error skipping today:", err);
      res.status(500).json({ message: "Server error" });
    }
  };