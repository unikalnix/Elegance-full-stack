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

const app = express();
const port = process.env.PORT || 3000;
const origins = [process.env.VITE_FRONTEND_URL, process.env.VITE_ADMIN_URL];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed this origin"));
      }
    },
    credentials: true,  
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

app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`);
});
