import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSidebar from "./components/ProtectedSidebar";
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
    <AuthProvider>
      <Router>
        <div className="app">
          <header className="app__navbar">
            <Navbar />
          </header>
          <div className="app__body">
            <ProtectedSidebar>
              <Sidebar />
            </ProtectedSidebar>
            <main className="app__content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product-details/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-details/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customers"
                  element={
                    <ProtectedRoute>
                      <Customers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer-details/:id"
                  element={
                    <ProtectedRoute>
                      <CustomerDetails />
                    </ProtectedRoute>
                  }
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
      </Router>
    </AuthProvider>
  );
};

export default App;
