import express from "express";
import pool from "../db.js";

const router = express.Router();

// example (no param) http://localhost:3000/api/user
// example (with param) http://localhost:3000/api/user?id=UEH001

router.get("/", async (req, res) => {
  const studentId = req.query.id;
  try {
    let rows;

    if (!studentId) {
      [rows] = await pool.query("SELECT * FROM users");
    } else {
      [rows] = await pool.query("SELECT * FROM users WHERE student_id = ?", [
        studentId,
      ]);
    }

    if (rows.length === 0)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    if (!studentId) {
      res.json({ status: "success", users: rows });
    } else {
      res.json({ status: "success", user: rows[0] });
    }
  } catch (err) {
    console.error("Get user by student_id error:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});

export default router;
