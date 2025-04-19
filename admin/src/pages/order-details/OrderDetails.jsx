import { useState } from "react";

const OrderDetails = ({ order, onBack, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleStatusUpdate = () => {
    onUpdateStatus(order.id, selectedStatus);
  };

  return (
    <div className="order-details">
      <div className="order-details__header">
        <h2 className="order-details__title">Order {order.id}</h2>
        <button className="order-details__back-button" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Orders</span>
        </button>
      </div>

      <div className="order-details__meta">
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Date:</span>
          <span className="order-details__meta-value">{order.date}</span>
        </div>
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Customer:</span>
          <span className="order-details__meta-value">{order.customer}</span>
        </div>
        <div className="order-details__meta-item">
          <span className="order-details__meta-label">Status:</span>
          <span
            className={`order-details__status-badge order-details__status-badge--${order.status.toLowerCase()}`}
          >
            {order.status}
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
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
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
          {order.timeline.map((event, index) => (
            <div key={index} className="order-details__timeline-item">
              <div className="order-details__timeline-marker"></div>
              <div className="order-details__timeline-content">
                <div className="order-details__timeline-status">
                  {event.status}
                </div>
                <div className="order-details__timeline-date">
                  {event.date} at {event.time}
                </div>
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
              {order.items.map((item, index) => (
                <tr key={index} className="order-details__table-row">
                  <td className="order-details__table-cell order-details__product-cell">
                    <div className="order-details__product">
                      <div className="order-details__product-image">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                        />
                      </div>
                      <div className="order-details__product-info">
                        <div className="order-details__product-name">
                          {item.name}
                        </div>
                        <div className="order-details__product-meta">
                          Color: {item.color}, Size: {item.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="order-details__table-cell order-details__price-cell">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="order-details__table-cell order-details__quantity-cell">
                    {item.quantity}
                  </td>
                  <td className="order-details__table-cell order-details__total-cell">
                    ${(item.price * item.quantity).toFixed(2)}
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
                {order.customer}
                <br />
                {order.email}
                <br />
                {order.phone}
              </p>
            </div>

            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Shipping Address</h4>
              <p className="order-details__info-text">
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Billing Address</h4>
              <p className="order-details__info-text">
                {order.billingAddress.name}
                <br />
                {order.billingAddress.street}
                <br />
                {order.billingAddress.city}, {order.billingAddress.state}{" "}
                {order.billingAddress.zip}
                <br />
                {order.billingAddress.country}
              </p>
            </div>

            <div className="order-details__info-section">
              <h4 className="order-details__info-title">Payment Information</h4>
              <p className="order-details__info-text">
                {order.payment.method}
                <br />
                {order.payment.cardNumber ? (
                  <>
                    {order.payment.cardNumber}
                    <br />
                    Exp: {order.payment.expiry}
                  </>
                ) : (
                  order.payment.email
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="order-details__summary">
          <h3 className="order-details__section-title">Order Summary</h3>
          <div className="order-details__summary-list">
            <div className="order-details__summary-item">
              <span className="order-details__summary-label">Subtotal</span>
              <span className="order-details__summary-value">
                ${order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="order-details__summary-item">
              <span className="order-details__summary-label">Shipping</span>
              <span className="order-details__summary-value">
                ${order.shipping.toFixed(2)}
              </span>
            </div>
            <div className="order-details__summary-item">
              <span className="order-details__summary-label">Tax</span>
              <span className="order-details__summary-value">
                ${order.tax.toFixed(2)}
              </span>
            </div>
            <div className="order-details__summary-item order-details__summary-item--total">
              <span className="order-details__summary-label">Total</span>
              <span className="order-details__summary-value">
                ${order.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-details__actions">
        <button className="order-details__action-button order-details__action-button--invoice">
          <Download size={16} />
          <span>Download Invoice</span>
        </button>
        <button className="order-details__action-button order-details__action-button--print">
          <Printer size={16} />
          <span>Print Order</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
