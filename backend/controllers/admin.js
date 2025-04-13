import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import userModel from "../models/user.js";

const dashboardDetails = async (req, res) => {
  try {
    const usersOrders = await orderModel.find();
    let totalSales = 0;
    let totalOrders = 0;
    const totalCustomers = usersOrders.length;

    for (const userOrders of usersOrders) {
      const totalSale = userOrders.userOrders.reduce((acc, order) => {
        return acc + order.orderTotal;
      }, 0);

      totalSales += totalSale;
      totalOrders += userOrders.userOrders.length;
    }

    const totalProducts = await productModel.countDocuments();

    return res.json({
      success: true,
      totalSales,
      totalOrders,
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const adminAddProducts = async (req, res) => {
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

    const newProduct = {
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

const adminDeleteProduct = async (req, res) => {
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
    let userOrder = [];
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
    // const customerPhone = customer.phone;
    const joinDate = customer.createdAt;
    const userOrdersDoc = await orderModel.findOne({ userId: id });
    const totalOrders = userOrdersDoc.userOrders.length;
    const totalSpent = userOrdersDoc.userOrders.reduce((acc, order) => {
      return acc + order.orderTotal;
    }, 0);
    const lastOrder = userOrdersDoc.userOrders.reverse()[0];
    const customerDetails = {
      customerName,
      customerEmail,
      joinDate,
      totalOrders,
      totalSpent,
      lastOrder,
    };

    return res.json({ success: true, customerDetails });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export {
  dashboardDetails,
  adminAddProducts,
  adminEditProducts,
  adminListProducts,
  adminDeleteProduct,
  adminListOrders,
  adminListOrderDetails,
  adminUpdateOrderStatus,
  adminListCustomers,
  adminListCustomerDetails,
};
