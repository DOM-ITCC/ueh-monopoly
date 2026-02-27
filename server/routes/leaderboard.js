import express from "express";
import pool from "../db.js";

const router = express.Router();

// example: http://localhost:3000/api/leaderboard/top?limit=1
router.get("/top", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.min(limit, 100);

    const [rows] = await pool.query(
      `
      SELECT user_id, fullname, email, student_id, highest_score, time_play, play_remaining
      FROM users
      ORDER BY highest_score DESC, time_play ASC
      LIMIT ?
    `,
      [safeLimit]
    );

    res.json({
      status: "success",
      leaderboard: rows,
    });
  } catch (err) {
    console.error("leaderboard error:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});

// http://localhost:3000/api/leaderboard/bot?limit=1
router.get("/bot", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.min(limit, 100);

    const [rows] = await pool.query(
      `
      SELECT user_id, fullname, email, student_id, highest_score, time_play, play_remaining
      FROM users
      ORDER BY highest_score ASC, time_play DESC
      LIMIT ?
    `,
      [safeLimit]
    );

    res.json({
      status: "success",
      leaderboard: rows,
    });
  } catch (err) {
    console.error("leaderboard error:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});

// GET /api/leaderboard/player-num
router.get("/player-num", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS playerNum FROM users");

    res.json({
      status: "success",
      playerNum: rows[0].playerNum,
    });
  } catch (err) {
    console.error("player_num error:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});


export default router;
