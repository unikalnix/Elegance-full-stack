import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectDB from "./config/db.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/orders.js";
import adminRouter from "./routes/admin.js";
import { verifyToken } from "./utils/jwt.js";

const app = express();
const port = process.env.PORT || 3000;
const origins = [
  process.env.VITE_FRONTEND_URL,
  process.env.VITE_ADMIN_URL,
  process.env.NETLIFY_FROTEND_URL,
  process.env.NETLIFY_ADMIN_URL,
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NETLIFY_FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/auth", authRouter);
app.use("/api/shop", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", orderRouter);
app.use("/api/admin", adminRouter);

app.get("/api/auth/me", async (req, res) => {
  const token = req.cookies.process.env.USER_AUTH_COOKIE;
  if (!token) return res.json({ success: false });

  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    return res.json({ success: true, user: decoded });
  } catch (err) {
    return res.json({ success: false });
  }
});

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`);
});
