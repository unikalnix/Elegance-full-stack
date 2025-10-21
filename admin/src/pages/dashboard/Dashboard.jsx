import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Boxes, DollarSign, PackageCheck, Users } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchDashboardDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.dashboardData);
      } else {
        console.log(res.data?.message || "Something went wrong in fetchDashBoardDetails")
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardDetails();
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__metrics">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="dashboard__card">
            <div
              style={{
                backgroundColor:
                  index === 0
                    ? "#4CAF50"
                    : index === 1
                    ? "#2196F3"
                    : index === 2
                    ? "#9C27B0"
                    : index === 3
                    ? "#FF9800"
                    : "",
              }}
              className="dashboard__card-icon"
            >
              {index === 0 ? (
                <DollarSign />
              ) : index === 1 ? (
                <Boxes />
              ) : index === 2 ? (
                <PackageCheck />
              ) : index === 3 ? (
                <Users />
              ) : null}
            </div>
            <div className="dashboard__card-info">
              <h1 className="dashboard__card-value">
                {index === 0
                  ? `$${data?.totalSales}`
                  : index === 1
                  ? `${data?.totalOrders}`
                  : index === 2
                  ? `${data?.totalProducts}`
                  : index === 3
                  ? `${data?.totalCustomers}`
                  : ""}
              </h1>
              <p className="dashboard__card-label">
                {index === 0
                  ? "Total Sales"
                  : index === 1
                  ? "Total Orders"
                  : index === 2
                  ? "Products"
                  : index === 3
                  ? "Customers"
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__orders">
        <div className="dashboard__orders-header">
          <h1 className="dashboard__orders-title">Recent Orders</h1>
          <p
            onClick={() => navigate("/orders")}
            className="dashboard__orders-link"
          >
            View all
          </p>
        </div>

        <table className="dashboard__table">
          <thead className="dashboard__table-head">
            <tr className="dashboard__table-row">
              <th className="dashboard__table-header">Order No</th>
              <th className="dashboard__table-header">Customer</th>
              <th className="dashboard__table-header">Date</th>
              <th className="dashboard__table-header">Total</th>
              <th className="dashboard__table-header">Status</th>
            </tr>
          </thead>

          <tbody className="dashboard__table-body">
            {data?.recentOrders?.length > 0 &&
              data.recentOrders.map((order, index) => (
                <tr key={index} className="dashboard__table-row">
                  <td className="dashboard__table-data">#{order.orderNo}</td>
                  <td className="dashboard__table-data">
                    {order.shippingDetails.firstName +
                      " " +
                      order.shippingDetails.lastName}
                  </td>
                  <td className="dashboard__table-data">
                    {new Date(order.Date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="dashboard__table-data">${order.orderTotal}</td>
                  <td className="dashboard__table-data">
                    <span className={`${order.status}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
