import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderNo = searchParams.get("orderNo");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/order/${id}?orderNo=${orderNo}`,
          { withCredentials: true }
        );
        
        if (res.data.success) {
          setOrderData(res.data);
        }
      } catch (error) {

        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderNo, id]);

  useEffect(() => {
    if (orderData) {
      setSelectedStatus(orderData.userOrder.status);
    }
  }, [orderData]);

  const handleStatusUpdate = async () => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/order/update/${id}?orderNo=${orderNo}`,
        {
          orderStatus: selectedStatus,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Refresh order data
        const updatedOrder = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/order/${id}?orderNo=${orderNo}`,
          { withCredentials: true }
        );
        setOrderData(updatedOrder.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!orderData) return <div>Order not found</div>;

  const { userOrder, customer } = orderData;

  const getTimelineItems = (status) => {
    const timeline = [
      { status: "pending", label: "Order Placed" },
      { status: "processing", label: "Processing" },
      { status: "shipped", label: "Shipped" },
      { status: "delivered", label: "Delivered" },
    ];

    const currentIndex = timeline.findIndex((item) => item.status === status);
    return timeline.map((item, index) => ({
      ...item,
      completed: index <= currentIndex,
      date: index <= currentIndex ? new Date().toLocaleDateString() : "",
      time: index <= currentIndex ? new Date().toLocaleTimeString() : "",
    }));
  };

  return (
    <div className="order-details">
      <div className="order-details__header">
        <h2 className="order-details__title">Order {userOrder.orderNo}</h2>
      </div>

      <div className="order-details__meta">
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Date:</span>
          <span className="order-details__meta-value">
            {new Date(userOrder.Date).toLocaleDateString()}
          </span>
        </div>
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Customer:</span>
          <span className="order-details__meta-value">{customer}</span>
        </div>
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Status:</span>
          <span
            className={`order-details__status-badge order-details__status-badge--${userOrder.status.toLowerCase()}`}
          >
            {userOrder.status}
          </span>
        </div>
      </div>

      <div className="order-details__update">
        <h3 className="order-details__section-title">Update Status</h3>
        <div className="order-details__update-controls">
          <select
            className="order-details__update-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            className="order-details__update-button"
            onClick={handleStatusUpdate}
          >
            Update
          </button>
        </div>
      </div>

      <div className="order-details__timeline">
        <h3 className="order-details__section-title">Order Timeline</h3>
        <div className="order-details__timeline-list">
          {getTimelineItems(userOrder.status).map((event, index) => (
            <div
              key={index}
              className={`order-details__timeline-item ${
                event.completed ? "order-details__timeline-item--completed" : ""
              }`}
            >
              <div className="order-details__timeline-marker"></div>
              <div className="order-details__timeline-content">
                <div className="order-details__timeline-status">
                  {event.label}
                </div>
                {event.completed && (
                  <div className="order-details__timeline-date">
                    {event.date} at {event.time}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-details__items">
        <h3 className="order-details__section-title">Order Items</h3>
        <div className="order-details__table-container">
          <table className="order-details__table">
            <thead className="order-details__table-head">
              <tr>
                <th className="order-details__table-header">Product</th>
                <th className="order-details__table-header">Price</th>
                <th className="order-details__table-header">Quantity</th>
                <th className="order-details__table-header">Total</th>
              </tr>
            </thead>
            <tbody className="order-details__table-body">
              {userOrder.items.map((item) => (
                <tr key={item._id} className="order-details__table-row">
                  <td className="order-details__table-cell order-details__product-cell">
                    <div className="order-details__product">
                      <div className="order-details__product-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="order-details__product-info">
                        <div className="order-details__product-name">
                          {item.title}
                        </div>
                        <div className="order-details__product-meta">
                          Color: {item.color.join(", ") || "N/A"}, Size:{" "}
                          {item.size.join(", ") || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="order-details__table-cell order-details__price-cell">
                    ${Number(item.totalPrice) / item.quantity}
                  </td>
                  <td className="order-details__table-cell order-details__quantity-cell">
                    {item.quantity}
                  </td>
                  <td className="order-details__table-cell order-details__total-cell">
                    ${item.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-details__sections">
        <div className="order-details__customer-info">
          <h3 className="order-details__section-title">Customer Information</h3>
          <div className="order-details__info-grid">
            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Contact Information</h4>
              <p className="order-details__info-text">
                {userOrder.shippingDetails.firstName}{" "}
                {userOrder.shippingDetails.lastName}
                <br />
                {userOrder.shippingDetails.email}
              </p>
            </div>

            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Shipping Address</h4>
              <p className="order-details__info-text">
                {userOrder.shippingDetails.address}
                <br />
                {userOrder.shippingDetails.country}
              </p>
            </div>

            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Payment Information</h4>
              <p className="order-details__info-text">
                Card Number: {userOrder.paymentMethod.cardNo}
              </p>
            </div>
          </div>
        </div>

        <div className="order-details__summary">
          <h3 className="order-details__section-title">Order Summary</h3>
          <div className="order-details__summary-list">
            <div className="order-details__summary-item order-details__summary-item--total">
              <span className="order-details__summary-label">Total</span>
              <span className="order-details__summary-value">
                ${userOrder.orderTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
