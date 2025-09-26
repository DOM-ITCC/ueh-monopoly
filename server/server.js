import express from "express";
import pool from "./db.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import userRoutes from "./routes/user.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001"   
}));
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send(
    "Xin chào! API ueh_monopoly đã sẵn sàng.\n\nLiên hệ:\n(CEO) Nguyễn Quang Huy - quanghuy71847@gmail.com - 0963040805\n(CTO) Đặng Trường Nguyên - dtn06052005@gmail.com - 0911398029\n\n© Sản phẩm thuộc bản quyền của DOM CORP. "
  );
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  try {
    const [rows] = await pool.query("SELECT NOW() as time");
    console.log(`Database connected. Server time: ${rows[0].time}`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
});
