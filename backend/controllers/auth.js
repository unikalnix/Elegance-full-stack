import cartModel from "../models/cart.js";
import userModel from "../models/user.js";
import productModel from "../models/product.js";
import { compareHash, genHash } from "../utils/bcrypt.js";
import { genToken, verifyToken } from "../utils/jwt.js";
import * as EmailValidator from "email-validator";

const userSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      guestCart,
      guestWishlist,
    } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!EmailValidator.validate(email)) {
      return res.json({ success: false, message: "Wrong email format" });
    }

    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords are not matched" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Weak password must be 8 characters long",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already registered" });
    }

    const hash = await genHash(password);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hash,
    });

    const token = await genToken(
      { _id: newUser._id, email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("user_auth_token", token);

    if (guestCart && guestCart.length > 0) {
      let existingCart = await cartModel.findOne({ userId: newUser._id });

      if (!existingCart) {
        existingCart = await cartModel.create({ userId: newUser._id });
      }

      for (let item of guestCart) {
        const product = await productModel.findOne({ _id: item.productId });
        if (!product) continue;

        const existingItem = existingCart.items.find(
          (existingItem) =>
            existingItem.productId.toString() === item.productId.toString()
        );

        if (existingItem) {
          existingItem.color = item.color;
          existingItem.size = item.size;
          existingItem.quantity += item.quantity;
          existingItem.totalPrice = (
            parseFloat(product.price) * parseFloat(existingItem.quantity)
          ).toString();
        } else {
          existingCart.items.push({
            productId: item.productId,
            title: product.title,
            image: product.image,
            size: item.size,
            color: item.color,
            price: product.price,
            quantity: item.quantity,
            totalPrice: (
              parseFloat(product.price) * parseFloat(item.quantity)
            ).toString(),
          });
        }
      }

      await existingCart.save();
    }

    if (guestWishlist && guestWishlist.length > 0) {
      newUser.wishlistData.push(...guestWishlist);
      await newUser.save();
    }

    return res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.json({
      success: false,
      message: `Something went wrong: ${error.message}`,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!EmailValidator.validate(email)) {
      return res.json({ success: false, message: "Wrong email format" });
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }

    const isVerified = await compareHash(password, existingUser.password);
    if (!isVerified) {
      return res.json({ success: false, message: "Wrong credentials" });
    }

    const token = await genToken(
      { _id: existingUser._id, email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("user_auth_token", token);

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.json({
      success: false,
      message: `Something went wrong ${error}`,
    });
  }
};

const userLogout = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Invalid token or user already logged out",
    });
  }

  const { guestWishlist } = req.body;
  const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
  const user = await userModel.findOne({ _id: payload._id });
  if (user) {
    user.wishlistData = guestWishlist;
    await user.save();
  }

  res.clearCookie("token");
  res.json({ success: true, message: "Logout successful" });
};

export { userSignup, userLogin, userLogout };
