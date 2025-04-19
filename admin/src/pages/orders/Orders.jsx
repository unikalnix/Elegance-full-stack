import { useState, useEffect } from "react";
import { Search, Filter, ArrowLeft, Download, Printer } from "lucide-react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [viewOrder, setViewOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/list`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update the handleViewOrder function
  const handleViewOrder = (orderId, userId) => {
    navigate(`/order-details/${userId}?orderNo=${orderId}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    const matchesDate =
      dateFilter === "" ||
      (dateFilter === "last-7-days" && isWithinLast7Days(order.date)) ||
      (dateFilter === "last-30-days" && isWithinLast30Days(order.date)) ||
      (dateFilter === "last-90-days" && isWithinLast90Days(order.date));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Helper functions for date filtering
  function isWithinLast7Days(dateString) {
    const orderDate = new Date(dateString);
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    return orderDate >= sevenDaysAgo;
  }

  function isWithinLast30Days(dateString) {
    const orderDate = new Date(dateString);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    return orderDate >= thirtyDaysAgo;
  }

  function isWithinLast90Days(dateString) {
    const orderDate = new Date(dateString);
    const now = new Date();
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
    return orderDate >= ninetyDaysAgo;
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return {
          ...order,
          status: newStatus,
          timeline: [
            ...order.timeline,
            {
              status: newStatus,
              date: dateStr,
              time: timeStr,
            },
          ],
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setViewOrder(updatedOrders.find((order) => order.id === orderId));
  };

  if (viewOrder) {
    return (
      <OrderDetails
        order={viewOrder}
        onBack={() => setViewOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    );
  }

  return (
    <div className="orders">
      <div className="orders__header">
        <h1 className="orders__title">Orders</h1>
      </div>

      <div className="orders__filters">
        <div className="orders__search">
          <Search size={18} className="orders__search-icon" />
          <input
            type="text"
            className="orders__search-input"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="orders__filter">
          <Filter size={18} className="orders__filter-icon" />
          <select
            className="orders__filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="orders__filter">
          <Filter size={18} className="orders__filter-icon" />
          <select
            className="orders__filter-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="last-7-days">Last 7 days</option>
            <option value="last-30-days">Last 30 days</option>
            <option value="last-90-days">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="orders__table-container">
        <table className="orders__table">
          <thead className="orders__table-head">
            <tr>
              <th className="orders__table-header">Order ID</th>
              <th className="orders__table-header">Customer</th>
              <th className="orders__table-header">Date</th>
              <th className="orders__table-header">Items</th>
              <th className="orders__table-header">Total</th>
              <th className="orders__table-header">Status</th>
              <th className="orders__table-header">Actions</th>
            </tr>
          </thead>

          <tbody className="orders__table-body">
            {loading ? (
              <tr>
                <td colSpan={7} className="orders__table-cell--loading">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderId} className="orders__table-row">
                  <td className="orders__table-cell orders__id-cell">
                    {order.orderId}
                  </td>
                  <td className="orders__table-cell orders__customer-cell">
                    {order.customer}
                  </td>
                  <td className="orders__table-cell orders__date-cell">
                    {order.date}
                  </td>
                  <td className="orders__table-cell orders__items-cell">
                    {order.items}
                  </td>
                  <td className="orders__table-cell orders__total-cell">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="orders__table-cell">
                    <span
                      className={`orders__status-badge orders__status-badge--${order.status}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="orders__table-cell orders__actions-cell">
                    <button
                      className="orders__action-button orders__action-button--view"
                      onClick={() => handleViewOrder(order.orderId, order.userId)} // Add userId here
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="orders__table-row orders__table-row--empty">
                <td
                  colSpan={7}
                  className="orders__table-cell orders__table-cell--empty"
                >
                  No orders found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
