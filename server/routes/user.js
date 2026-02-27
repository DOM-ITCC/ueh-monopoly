import express from "express";
import pool from "../db.js";
import jwt, { decode } from "jsonwebtoken";

const router = express.Router();

// example (no param) http://localhost:3000/api/user
// example (with param) http://localhost:3000/api/user?student_id=31231025269

router.get("/", async (req, res) => {
  const student_id = req.query.student_id;
  try {
    let rows;

    if (!student_id) {
      [rows] = await pool.query("SELECT * FROM users");
    } else {
      [rows] = await pool.query("SELECT * FROM users WHERE student_id = ?", [
        student_id,
      ]);
    }

    if (rows.length === 0)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    if (!student_id) {
      res.json({ status: "success", users: rows });
    } else {
      res.json({ status: "success", user: rows[0] });
    }
  } catch (err) {
    if (!student_id) {
      console.error("Get all user error:", err);
    } else {
      console.error("Get user by student_id error:", err);
    }

    res.status(500).json({ status: "error", message: "Database error" });
  }
});

// POST /login
// body: { fullname, email, student_id }
router.post("/login", async (req, res) => {
  const { fullname, email, student_id } = req.body;

  if (!fullname || !email || !student_id) {
    return res.status(400).json({
      status: "error",
      message: "Vui lòng điền đầy đủ thông tin!",
    });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      const [result] = await pool.query(
        "INSERT INTO users (fullname, email, student_id) VALUES (?, ?, ?)",
        [fullname, email, student_id]
      );

      return res.status(201).json({
        status: "success",
        message: "Đăng nhập thành công!",
        user_id: result.insertId,
      });
    } else {
      await pool.query(
        "UPDATE users SET fullname = ?, student_id = ? WHERE email = ?",
        [fullname, student_id, email]
      );
      if (rows[0].play_remaining <= 0) {
        return res.json({
          status: "error",
          message: "Bạn đã hết lượt chơi"
        });
      }

      const token = jwt.sign(
        {
          student_id: student_id,
          email: email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d'
        }
      )

      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      })

      return res.json({
        status: "success",
        message: "Cập nhật thông tin và Đăng nhập thành công!",
        user_id: rows[0].user_id,
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});

// GET /api/user/verifyToken
router.get("/verifyToken", async (req, res) => {
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

    let [rows] = await pool.query(
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

    res.json({
      status: "success",
      message: "Token hợp lệ!",
      userInfo: rows[0]
    })
  }
  catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
})

// GET /api/user/logout
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });
  res.json({
    status: "success",
    message: "Đăng xuất thành công!"
  })
})

export default router;
