import addressModel from "../models/address.js";
import orderModel from "../models/order.js";
import paymentModel from "../models/paymentInfo.js";
import { genHash } from "../utils/bcrypt.js";
import generateOrderId from "../utils/genOrderId.js";
import getEstimatedDelivery from "../utils/getEstimatedDelivery.js";
import { verifyToken } from "../utils/jwt.js";

const listOrders = async (req, res) => {
  try {
    const token = req.token;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const user = await orderModel.findOne({ userId: payload._id });
    if (!user) {
      return res.json({ success: false, message: "No orders" });
    }

    const orders = user.userOrders;
    return res.json({ success: true, message: "Fetched all orders", orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const listOrder = async (req, res) => {
  try {
    const token = req.token;
    const id = req.params.id;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const user = await orderModel.findOne({ userId: payload._id });
    if (!user) {
      return res.json({ success: false, message: "No orders" });
    }

    const orders = user.userOrders;
    const order = orders.find(
      (order) => order.orderNo.toString() === id.toString()
    );
    if (!order) {
      return res.json({ success: false, message: "No order details found" });
    }

    return res.json({ success: true, message: "Fetched order details", order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const makeOrder = async (req, res) => {
  try {
    let isPaymentDone = false;
    const token = req.token;
    const type = req.query.type;
    const payload = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const { shippingDetails, billingDetails, cartData } = req.body;
    if (type === "shipping") {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        postCode,
        country,
      } = shippingDetails;
      if (!firstName || !email || !phone || !address || !city || !postCode) {
        return res.json({
          success: false,
          message: "Mentioned fields are required",
        });
      }
      const existingUserAddress = await addressModel.findOne({
        userId: payload._id,
      });
      if (existingUserAddress) {
        existingUserAddress.addresses.push({
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          state,
          postCode,
          country,
        });

        await existingUserAddress.save();
      } else {
        await addressModel.create({
          userId: payload._id,
          addresses: [
            {
              firstName,
              lastName,
              email,
              phone,
              address,
              city,
              state,
              postCode,
              country,
            },
          ],
        });
      }
    } else if (type === "billing") {
      const { cardNo, expiryDate, cvc, nameOnCard } = billingDetails;
      if (!cardNo || !expiryDate || !cvc || !nameOnCard) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }
      const hashedCardNo = await genHash(cardNo);
      const hashedCvc = await genHash(cvc);
      const existingUserPaymentInfo = await paymentModel.findOne({
        userId: payload._id,
      });
      if (existingUserPaymentInfo) {
        existingUserPaymentInfo.paymentDetails.push({
          cardNo: hashedCardNo,
          expiryDate,
          cvc: hashedCvc,
          nameOnCard,
        });

        await existingUserPaymentInfo.save();
      } else {
        await paymentModel.create({
          userId: payload._id,
          paymentDetails: [
            { cardNo: hashedCardNo, expiryDate, cvc: hashedCvc, nameOnCard },
          ],
        });
      }

      isPaymentDone = true;
    } else {
      return res.status(400).json({ message: "Invalid order type" });
    }

    if (isPaymentDone) {
      const orderId = generateOrderId();
      const estimatedDelivery = getEstimatedDelivery(0, 3); // later change by admin
      let existingUserOrder = await orderModel.findOne({
        userId: payload._id,
      });
      const orderTotal = cartData.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseFloat(item.quantity));
      }, 0);
      const newOrder = {
        orderNo: orderId,
        items: cartData,
        orderTotal,
        status: "pending",
        estimatedDelivery,
        paymentMethod: { cardNo: "********" + billingDetails.cardNo.slice(-4) },
        shippingDetails: {
          firstName: shippingDetails.firstName,
          lastName: shippingDetails.lastName,
          email: shippingDetails.email,
          address: shippingDetails.address,
          country: shippingDetails.country,
        },
      };
      if (!existingUserOrder) {
        existingUserOrder = await orderModel.create({
          userId: payload._id,
          userOrders: [
            {
              orderNo: orderId,
              items: cartData,
              orderTotal,
              status: "pending",
              estimatedDelivery,
              paymentMethod: {
                cardNo: "********" + billingDetails.cardNo.slice(-4),
              },
              shippingDetails: {
                firstName: shippingDetails.firstName,
                lastName: shippingDetails.lastName,
                email: shippingDetails.email,
                address: shippingDetails.address,
                country: shippingDetails.country,
              },
            },
          ],
        });
      } else {
        existingUserOrder.userOrders.push({
          orderNo: orderId,
          items: cartData,
          orderTotal,
          status: "pending",
          estimatedDelivery,
          paymentMethod: {
            cardNo: "********" + billingDetails.cardNo.slice(-4),
          },
          shippingDetails: {
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            email: shippingDetails.email,
            address: shippingDetails.address,
            country: shippingDetails.country,
          },
        });

        await existingUserOrder.save();
      }

      return res.json({
        success: true,
        message: "Order placed",
        orderDetails: newOrder,
      });
    }

    return res.json({
      success: true,
      message: `Order with ${type} details processed`,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { listOrders, listOrder, makeOrder };
