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

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.VITE_FRONTEND_URL,
      process.env.VITE_ADMIN_URL,
      process.env.VERCEL_FRONTEND_URL,
      process.env.VERCEL_ADMIN_URL,
    ],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.get("/api/check-auth", async (req, res) => {
  try {
    const token = req.cookies.user_auth_token;
    if (!token) return res.json({ success: false, message: "No token" });

    const user = await verifyToken(token, process.env.JWT_SECRET_KEY);
    if (!user) return res.json({ success: false, message: "Invalid token" });

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/shop", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", orderRouter);
app.use("/api/admin", adminRouter);

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`);
});
