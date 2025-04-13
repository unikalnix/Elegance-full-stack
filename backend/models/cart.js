import mongoose from "mongoose";

// Define the schema for the cart model
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      title: String,
      image: String,
      size: { type: [String], default: [] },
      color: { type: [String], default: [] },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: String,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
