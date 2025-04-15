import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  adminLogin,
  adminLogout,
  dashboardDetails,
  adminAddProducts,
  adminListProducts,
  adminEditProducts,
  adminDeleteProduct,
  adminListOrders,
  adminListOrderDetails,
  adminUpdateOrderStatus,
  adminListCustomers,
  adminListCustomerDetails,
} from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", adminAuth, adminLogout);
adminRouter.get("/dashboard", adminAuth, dashboardDetails);
adminRouter.post("/product/add", adminAuth, adminAddProducts);
adminRouter.post("/product/edit/:id", adminAuth, adminEditProducts);
adminRouter.post("/products/list", adminAuth, adminListProducts);
adminRouter.post("/product/delete/:id", adminAuth, adminDeleteProduct);
adminRouter.post("/orders/list", adminAuth, adminListOrders);
adminRouter.post("/order/:id", adminAuth, adminListOrderDetails);
adminRouter.post("/order/update/:id", adminAuth, adminUpdateOrderStatus);
adminRouter.post("/customers/list", adminAuth, adminListCustomers);
adminRouter.post("/customer/:id", adminAuth, adminListCustomerDetails);

export default adminRouter;
