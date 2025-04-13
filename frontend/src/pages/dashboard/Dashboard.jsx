// Imports
import { Heart, LogOut, Settings, ShoppingBag, User } from "lucide-react";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shirt from "../../assets/images/shirt.jpeg";
import { useCart } from "../../context/CartContext";
import axios from "axios";

// Component Function
const Dashboard = () => {
  // Declarations
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Smith");
  const [email, setEmail] = useState("john.smith@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const navigate = useNavigate();
  const { wishListData } = useCart();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  // Functions
  const handleLogout = () => {
    alert("You are logged out");
  };

  const fetchRecentOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/orders`, { withCredentials: true });
      if (res.data.success) {
        setOrders(res.data.orders);
        setStatus(res.data.orders.map((order) => order.status));
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  }


  useEffect(() => {
    fetchRecentOrders();
  }, []);

  useEffect(() => {
  }, [orders, status]);



  const handleInfoUpdate = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      phone,
    };

    confirm("Review your changes\n", userData);
    alert("Your changes are saved");
  };

  // Return Component
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">My Dashboard</h1>

      <div className="dashboard__container">
        {/* Profile Section */}
        <div className="dashboard__profile">
          <div className="dashboard__profile-header">
            <div className="dashboard__profile-image">
              <img src={shirt} alt="User" />
            </div>
            <div>
              <h1 className="dashboard__profile-name">
                {firstName} {lastName}
              </h1>
              <p className="dashboard__profile-email">{email}</p>
            </div>
          </div>

          <ul className="dashboard__menu">
            <li className="dashboard__menu-item dashboard__menu-item--active">
              <User /> Account
            </li>
            <li
              onClick={() => navigate("/orders")}
              className="dashboard__menu-item"
            >
              <ShoppingBag /> My Orders
            </li>
            <li
              onClick={() => navigate("/wishlist")}
              className="dashboard__menu-item"
            >
              <Heart /> Wishlist <span>{wishListData.length}</span>
            </li>
            <li
              onClick={() => navigate("/settings")}
              className="dashboard__menu-item"
            >
              <Settings /> Settings
            </li>
            <li
              onClick={handleLogout}
              className="dashboard__menu-item dashboard__menu-item--logout"
            >
              <LogOut /> Logout
            </li>
          </ul>
        </div>

        {/* Personal Info Section */}
        <div className="dashboard__info">
          <h1 className="dashboard__info-title">Personal Information</h1>
          <form onSubmit={handleInfoUpdate} className="dashboard__form">
            <div className="dashboard__form-group">
              <div className="dashboard__form-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="dashboard__form-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="dashboard__form-group">
              <div className="dashboard__form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="dashboard__form-field">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Update Information"
              className="dashboard__form-submit"
            />
          </form>

          <hr className="dashboard__info-divider" />

          {/* Recent Orders Section */}
          <h1 className="dashboard__orders-title">Recent Orders</h1>

          {orders?.length > 0 && orders.reverse().slice(0, 5).map((order, i) => {
            return (
              <div key={i} className="dashboard__order">
                <div className="dashboard__order-info">
                  <div className="dashboard__order-info--details">
                    <h1>#{order.orderNo}</h1>
                    <p>Placed on {new Date(order.Date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', ' -')}</p>
                  </div>
                  <div className="dashboard__order-info--status">
                    <h1>${order.orderTotal}</h1>
                    <p className={`dashboard__order-info--status--${order.status}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
                <p
                  onClick={() => navigate(`/order-details/${order.orderNo}`)}
                  className="dashboard__order-details"
                >
                  View Order Details
                </p>
                <hr className="dashboard__order-divider" />
              </div>
            );
          })}
          <p
            onClick={() => navigate("/orders")}
            className="dashboard__view-all"
          >
            View All Orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
