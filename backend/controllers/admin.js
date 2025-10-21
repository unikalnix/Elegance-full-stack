import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import userModel from "../models/user.js";
import { genToken } from "../utils/jwt.js";

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ success: false, message: "All fileds are required" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const newToken = await genToken(
        { email, password },
        process.env.JWT_SECRET_KEY
      );
      res.cookie(`${process.env.ADMIN_AUTH_COOKIE}`, newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Login successful", newToken });
    } else if (email === process.env.USER_EMAIL &&
      password === process.env.USER_PASSWORD) {
      const newToken = await genToken(
        { email, password },
        process.env.JWT_SECRET_KEY
      );
      res.cookie(`${process.env.USER_AUTH_COOKIE}`, newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Login successful", newToken });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminLogout = async (req, res) => {
  try {
    const token = req.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Invalid token or user already logged out",
      });
    }

    res.clearCookie(`${process.env.ADMIN_AUTH_COOKIE}`, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const dashboardDetails = async (req, res) => {
  try {
    const usersOrders = await orderModel.find();
    let totalSales = 0;
    let totalOrders = 0;
    const totalCustomers = usersOrders.length;
    const allOrders = [];

    for (const userOrders of usersOrders) {
      const totalSale = userOrders.userOrders.reduce((acc, order) => {
        return acc + order.orderTotal;
      }, 0);

      totalSales += totalSale;
      totalOrders += userOrders.userOrders.length;

      allOrders.push(...userOrders.userOrders);
    }

    const recentOrders = allOrders
      .sort((a, b) => new Date(b.Date) - new Date(a.Date))
      .slice(0, 20);

    const totalProducts = await productModel.countDocuments();

    const dashboardData = {
      totalSales,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
    };
    return res.json({
      success: true,
      message: "Fetched dashboard details",
      dashboardData,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminAddProducts = async (req, res) => {

  const { isAdmin } = req || {};

  if (!isAdmin) return res.json({ success: false, message: "Can't add product in user mode" })

  try {
    const {
      type,
      title,
      description,
      price,
      images,
      color,
      size,
      isNeww,
      isFeatured,
      isOnSale,
      image,
      discountPercentage,
      originalPrice,
      category,
      inStock,
      details,
      sizing,
      care,
    } = req.body;

    const addedProduct = await productModel.create({
      type,
      title,
      description,
      price,
      images,
      color,
      size,
      isNeww,
      isFeatured,
      isOnSale,
      image,
      discountPercentage,
      originalPrice,
      category,
      inStock,
      details,
      sizing,
      care,
    });

    return res.json({ success: true, message: "Product added", addedProduct });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminEditProducts = async (req, res) => {
  const id = req.params.id;
  const isAdmin = req?.isAdmin;

  if (!isAdmin) return res.json({ success: false, message: "Can't edit in user mode" });
  try {
    const {
      type,
      title,
      description,
      price,
      images,
      color,
      size,
      isNeww,
      isFeatured,
      isOnSale,
      image,
      discountPercentage,
      originalPrice,
      category,
      inStock,
      details,
      sizing,
      care,
    } = req.body;



    const productToUpdate = {
      type,
      title,
      description,
      price,
      images,
      color,
      size,
      isNeww,
      isFeatured,
      isOnSale,
      image,
      discountPercentage,
      originalPrice,
      category,
      inStock,
      details,
      sizing,
      care,
    };

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      productToUpdate,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Product updated",
      updatedProduct,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminListProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();

    return res.json({
      success: true,
      message: "Fetched all products",
      length: allProducts.length,
      allProducts,
    });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};

const adminListProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product found",
      product,
    });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};

const adminDeleteProduct = async (req, res) => {

  const { isAdmin } = req || {};

  if (!isAdmin) return res.json({ success: false, message: "Can't delete product in user mode" })
  try {
    const id = req.params.id;

    const deletedProduct = await productModel.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.json({
        success: false,
        message: "Product not found or already removed",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted",
      deletedProduct,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminListOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find();
    const orderList = [];

    for (const order of allOrders) {
      const user = await userModel.findById(order.userId);
      const userName = user?.fullName || "Unknown User";

      for (const userOrder of order.userOrders) {
        orderList.push({
          orderId: userOrder.orderNo,
          userId: order.userId, // Add this line
          customer: userName,
          date: new Date(userOrder.Date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          items: userOrder.items?.length,
          total: userOrder.orderTotal,
          status: userOrder.status,
        });
      }
    }

    return res.json({
      success: true,
      message: "Fetched all orders",
      data: orderList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminListOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const orderNo = req.query.orderNo;

    let userOrder = {};
    const user = await userModel.findOne({ _id: userId });
    const existingOrders = await orderModel.findOne({ userId });

    if (existingOrders) {
      userOrder = existingOrders.userOrders.find(
        (order) => order.orderNo.toString() === orderNo.toString()
      );
    } else {
      return res.json({
        success: false,
        message: "No order found of the user",
      });
    }

    return res.json({
      success: true,
      message: "Fetched order details",
      customer: user.fullName,
      userOrder,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminUpdateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderNo } = req.query;
  const { orderStatus } = req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) return res.json({ success: false, message: "User not found" });

    const userOrderDoc = await orderModel.findOne({ userId: user._id });
    if (!userOrderDoc)
      return res.json({ success: false, message: "User orders not found" });

    const order = userOrderDoc.userOrders.find(
      (o) => o.orderNo.toString() === orderNo.toString()
    );

    if (!order) return res.json({ success: false, message: "Order not found" });

    order.status = orderStatus;
    order.statusUpdatedAt = new Date();

    await userOrderDoc.save();

    return res.json({
      success: true,
      message: `Status updated to ${orderStatus}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminListCustomers = async (req, res) => {
  let data = [];
  try {
    const customers = await userModel.find();
    for (const customer of customers) {
      const cname = customer.fullName;
      const cemail = customer.email;
      const userOrdersDoc = await orderModel.find({ userId: customer._id });
      const userOrders = userOrdersDoc[0]?.userOrders || [];
      const ordersLength = userOrders.length;
      const totalSpent = userOrders.reduce((acc, order) => {
        return acc + order.orderTotal;
      }, 0);

      data.push({
        _id: customer._id,
        cname,
        cemail,
        ordersLength,
        totalSpent,
      });
    }

    return res.json({
      success: true,
      message: "Fetched all customers",
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminListCustomerDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await userModel.findById(id);
    const customerName = customer.fullName;
    const customerEmail = customer.email;
    const joinDate = customer.createdAt;
    const userOrdersDoc = await orderModel.findOne({ userId: id });
    const totalOrders = userOrdersDoc.userOrders.length;
    const totalSpent = userOrdersDoc.userOrders.reduce((acc, order) => {
      return acc + order.orderTotal;
    }, 0);
    const lastOrder = userOrdersDoc.userOrders.reverse()[0];

    // Get all orders for this customer
    const customerOrders = userOrdersDoc.userOrders.map(order => ({
      orderId: order.orderNo,
      date: new Date(order.Date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      items: order.items.length,
      total: order.orderTotal,
      status: order.status
    }));

    const customerDetails = {
      customerName,
      customerEmail,
      joinDate,
      totalOrders,
      totalSpent,
      lastOrder,
      orders: customerOrders // Added customer orders to the response
    };

    return res.json({ success: true, customerDetails });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export {
  adminLogin,
  adminLogout,
  dashboardDetails,
  adminAddProducts,
  adminEditProducts,
  adminListProducts,
  adminListProduct,
  adminDeleteProduct,
  adminListOrders,
  adminListOrderDetails,
  adminUpdateOrderStatus,
  adminListCustomers,
  adminListCustomerDetails,
};
