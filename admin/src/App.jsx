import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app__navbar">
          <Navbar />
        </header>
        <div className="app__body">
          <Sidebar />
          <main className="app__content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customer-details" element={<CustomerDetails />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
