import express from "express";
import {
  addToCart,
  removeFromCart,
  updateCart,
  deleteCart,
  getCart
} from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.post("/update", updateCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/delete", deleteCart);
cartRouter.get("/get", getCart);

export default cartRouter;
