import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({
        status: "error",
        message: "Vui lòng đăng nhập!"
      });
      return;
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { student_id, email } = decoded;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE student_id = ? AND email = ?",
      [student_id, email]
    );
    if (rows.length == 0) {
      res.json({
        status: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }
    const [result] = await pool.query(
      "INSERT INTO game_session (user_id, tokens, moves_left) VALUES (?, ?, ?)",
      [rows[0].user_id, 0, 5]
    )

    await pool.query(
      "UPDATE users SET play_remaining = play_remaining - 1 WHERE user_id = ?",
      [rows[0].user_id]
    );

    res.json({
      status: "success",
      message: "Tạo game-session thành công!",
      sessionId: result.insertId
    })
  }
  catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
})

router.patch("/update", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({
        status: "error",
        message: "Vui lòng đăng nhập!"
      });
      return;
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { student_id, email } = decoded;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE student_id = ? AND email = ?",
      [student_id, email]
    );
    if (rows.length == 0) {
      res.json({
        status: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }
    const [result] = await pool.query(
      "UPDATE game_session SET moves_left = ? WHERE session_id = ?",
      [req.body.moves_left, req.body.sessionId]
    )

    res.json({
      status: "success",
      message: "Cập nhật game-session thành công!"
    })
  }
  catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
})

router.post("/close", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM game_session WHERE session_id = ?",
      [req.body.sessionId]
    );

    res.json({
      status: "success",
      message: "Đã thoát game"
    })
  }
  catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
})

export default router;