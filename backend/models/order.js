import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userOrders: [
      {
        orderNo: {
          type: String,
          required: true,
        },
        Date: {
          type: Date,
          default: Date.now,
        },
        items: [
          {
            image: String,
            title: String,
            color: [String],
            size: [String],
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
        orderTotal: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
        statusUpdatedAt: {
          type: Date,
          default: Date.now,
        },
        estimatedDelivery: {
          type: String,
        },
        paymentMethod: {
          cardNo: String,
        },
        shippingDetails: {
          firstName: String,
          lastName: String,
          email: String,
          address: String,
          country: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
