// Imports
import React, { useEffect, useState } from "react";
import "./Orders.css";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import NotFound from "../not-found/NotFound";
import useIsLogin from "../../hooks/isLogin";
import axios from "axios";
import { useToast } from '../../context/ToastContext'

// Component Function
const Orders = () => {
  // Declarations
  const navigate = useNavigate();
  const isLogin = useIsLogin();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  const fetchAllOrders = async () => {
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
    fetchAllOrders();
  }, []);

  useEffect(() => {
  }, [orders, status]);


  // Return Component
  return isLogin ? (
    <div className="orders">
      <h1 className="orders__title">My Orders</h1>
      <Breadcrumb links={["home", "dashboard", "orders"]} />
      <div className="orders__table-container">
        <table className="orders__table">
          <thead className="orders__table-head">
            <tr className="orders__table-row">
              <th className="orders__table-header">Order ID</th>
              <th className="orders__table-header">Date</th>
              <th className="orders__table-header">Items</th>
              <th className="orders__table-header">Total</th>
              <th className="orders__table-header">Status</th>
              <th className="orders__table-header">Action</th>
            </tr>
          </thead>
          <tbody className="orders__table-body">
            {orders.reverse().map((order, index) => (
              <tr key={index} className="orders__table-row">
                <td className="orders__table-data orders__table-data-icon">
                  <ShoppingCart
                    size={15}
                    stroke="rgba(75, 85, 99, 0.64)"
                    className="orders__icon"
                  />{" "}
                  #{order.orderNo}
                </td>
                <td className="orders__table-data"> {new Date(order.Date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</td>
                <td className="orders__table-data">{order.items.length} item(s)</td>
                <td className="orders__table-data">${order.orderTotal}</td>
                <td className="orders__table-data">
                  <span className={`${order.status}`}>{order.status}</span>
                </td>
                <td
                  onClick={() => navigate(`/order-details/${order.orderNo}`)}
                  className="orders__table-data orders__table-data-icon"
                >
                  Details{" "}
                  <ChevronRight
                    size={15}
                    stroke="rgb(30, 64, 175)"
                    className="orders__action-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (<NotFound />);
};

export default Orders;
