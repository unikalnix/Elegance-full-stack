import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/product-details/ProductDetails";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/order-details/OrderDetails";
import Customers from "./pages/customers/Customers";
import CustomerDetails from "./pages/customer-details/CustomerDetails";
import NotFound from "./pages/not-found/NotFound";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app">
      <header className="app__navbar">
        <Navbar />
      </header>
      <div className="app__body">
        {isAuthenticated && <Sidebar />}
        <main
          style={{
            width: !isAuthenticated && "100%",
          }}
          className="app__content"
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={isAuthenticated && <Dashboard />} />
            <Route path="/products" element={isAuthenticated && <Products />} />
            <Route
              path="/product-details/edit/:id"
              element={isAuthenticated && <ProductDetails />}
            />
            <Route
              path="/product-details/add"
              element={isAuthenticated && <ProductDetails />}
            />
            <Route path="/orders" element={isAuthenticated && <Orders />} />
            <Route
              path="/order-details/:id"
              element={isAuthenticated && <OrderDetails />}
            />
            <Route
              path="/customers"
              element={isAuthenticated && <Customers />}
            />
            <Route
              path="/customer-details/:id"
              element={isAuthenticated && <CustomerDetails />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
