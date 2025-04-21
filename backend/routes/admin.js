import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  adminLogin,
  adminLogout,
  dashboardDetails,
  adminAddProducts,
  adminListProducts,
  adminListProduct,
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
adminRouter.get("/products/list", adminAuth, adminListProducts);
adminRouter.get("/product/list/:id", adminAuth, adminListProduct);
adminRouter.post("/product/edit/:id", adminAuth, adminEditProducts);
adminRouter.post("/product/add", adminAuth, adminAddProducts);
adminRouter.get("/product/delete/:id", adminAuth, adminDeleteProduct);
adminRouter.get("/orders/list", adminAuth, adminListOrders);
adminRouter.get("/order/:id", adminAuth, adminListOrderDetails);
adminRouter.post("/order/update/:id", adminAuth, adminUpdateOrderStatus);
adminRouter.get("/customers/list", adminAuth, adminListCustomers);
adminRouter.get("/customer/:id", adminAuth, adminListCustomerDetails);

export default adminRouter;
