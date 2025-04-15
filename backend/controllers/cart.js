import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import { verifyToken } from "../utils/jwt.js";

const addToCart = async (req, res) => {
  try {
    const { _id, quantity, size, color } = req.body;
    const token = req.cookies.user_auth_token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const product = await productModel.findOne({ _id });

    let existingCart = await cartModel.findOne({ userId: payload._id });

    if (!existingCart) {
      existingCart = await cartModel.create({ userId: payload._id });
    }

    const existingItem = existingCart.items.find((item) => {
      return item.productId.toString() === _id;
    });

    if (existingItem) {
      existingItem.color = color;
      existingItem.size = size;
      existingItem.quantity += quantity;
      existingItem.totalPrice = (
        parseFloat(product.price) * parseFloat(existingItem.quantity)
      ).toString();
    } else {
      // if not create
      existingCart.items.push({
        productId: _id,
        title: product.title,
        image: product.image,
        size,
        color,
        price: product.price,
        quantity,
        totalPrice: (
          parseFloat(product.price) * parseFloat(quantity)
        ).toString(),
      });
    }

    await existingCart.save();
    return res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.body;
    const token = req.cookies.user_auth_token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);

    await cartModel.findOneAndUpdate(
      { userId: payload._id },
      { $pull: { items: { productId: _id } } },
      { new: true }
    );

    return res.json({ success: true, message: "Item removed" });
  } catch (error) {
    return res.json({
      success: false,
      message: "Item not deleted or already removed",
    });
  }
};
const updateCart = async (req, res) => {
  try {
    const updatedCart = req.body; // [{_id: "productId", quantity: "any quantity"}]
    const token = req.cookies.user_auth_token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    let existingCart = await cartModel.findOne({ userId: payload._id });
    if (!updatedCart.length > 0) {
      return res.json({ success: false, message: "Your cart is empty" });
    }
    if (!existingCart) {
      existingCart = await cartModel.create({ userId: payload._id });
    }
    const existingItems = existingCart.items;

    for (const item of updatedCart) {
      const existingItem = existingItems.find(
        (eItem) => eItem.productId.toString() === item._id.toString()
      );
      if (existingItem) {
        existingItem.quantity = item.quantity;
        existingItem.totalPrice =
          parseFloat(item.quantity) * parseFloat(existingItem.price);
      } else {
        return res.json({
          success: false,
          message: `Item ${item._id} not found in cart.`,
        });
      }
    }

    await existingCart.save();
    return res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const deleteCart = async (req, res) => {
  try {
    const token = req.cookies.user_auth_token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    await cartModel.findOneAndUpdate({ userId: payload._id }, { items: [] });
    return res.json({ success: true, message: "We empty your cart" });
  } catch (error) {
    return res.json({
      success: false,
      message: `Error empty your cart ,${error.message}`,
    });
  }
};
const getCart = async (req, res) => {
  try {
    const token = req.cookies.user_auth_token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const cart = await cartModel.findOne({ userId: payload._id });
    if (!cart)
      return res.json({ success: false, message: "Your cart is empty" });
    return res.json({
      success: true,
      message: "Fetching cart details",
      cart: cart.items,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Error fetching cart details ,${error.message}`,
    });
  }
};

export { addToCart, removeFromCart, updateCart, deleteCart, getCart };
