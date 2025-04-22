// Imports
import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import { shippingFee, taxFee } from "../../assets/data";
import axios from "axios";
import {
  ArrowLeft,
  BusFront,
  Check,
  Download,
  LucideCross,
  Package,
  Printer,
  ShoppingBag,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

// Component Function
const OrderDetails = () => {
  // Declarations
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const { id } = useParams();
  const [orderNo, setOrderNo] = useState(id);
  const [orderDetails, setOrderDetails] = useState({});
  const { showToast } = useToast();
  const [status, setStatus] = useState("");

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/orders/${orderNo}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setOrderDetails(res.data.order);
        setStatus(res.data.order.status);
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  useEffect(() => {}, [status]);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  // Return Component
  return (
    <div className="order-details">
      {/* Breadcrumb */}
      <Breadcrumb links={["home", "dashboard", "orders", `Order ${orderNo}`]} />

      {/* Header Section */}
      <div className="order-details__header">
        <h3 onClick={() => navigate("/orders")} className="order-details__back">
          <ArrowLeft size={15} />
          Back to Orders
        </h3>
        <div className="order-details__actions">
          <button className="order-details__button">
            <Printer size={15} />
            Print
          </button>
          <button className="order-details__button">
            <Download size={15} />
            Download
          </button>
        </div>
      </div>

      {/* Order Overview */}
      <div className="order-details__overview">
        <div className="order-details__info">
          <h1 className="order-details__title">{orderDetails.orderNo}</h1>
          <p className="order-details__date">
            Placed on{" "}
            {new Date(orderDetails.Date)
              .toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace(",", " -")}
          </p>
        </div>
        <h2 className="order-details__status">
          <span className={`${orderDetails.status}`}>
            {orderDetails.status}
          </span>
        </h2>
      </div>

      {/* Order Timeline */}
      <div className="order-details__timeline">
        <h1 className="order-details__timeline-title">Order Timeline</h1>

        <div className="order-details__timeline-step">
          <div className="order-details__timeline-icons">
            <ShoppingBag
              size={30}
              className={`order-details__timeline-icon pending`}
            />
            <hr />
          </div>
          <div className="order-details__timeline-info">
            <h1>Order placed</h1>
            <p>
              {new Date(orderDetails.Date)
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", " -")}
            </p>
          </div>
        </div>

        {(status === "processing" ||
          status === "shipped" ||
          status === "delivered" ||
          status === "cancelled") && (
          <div className="order-details__timeline-step">
            <div className="order-details__timeline-icons">
              <Package
                size={30}
                className={`order-details__timeline-icon processing`}
              />
              <hr />
            </div>
            <div className="order-details__timeline-info">
              <h1>Processing</h1>
              <p>
                {new Date(orderDetails.statusUpdatedAt)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")
                  .replace(" ", " - ")}
              </p>
            </div>
          </div>
        )}

        {(status === "shipped" || status === "delivered") && (
          <div className="order-details__timeline-step">
            <div className="order-details__timeline-icons">
              <BusFront
                size={30}
                className={`order-details__timeline-icon shipped`}
              />
              <hr />
            </div>
            <div className="order-details__timeline-info">
              <h1>Shipped</h1>
              <p>
                {new Date(orderDetails.statusUpdatedAt)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")
                  .replace(" ", " - ")}
              </p>
            </div>
          </div>
        )}

        {status === "delivered" && (
          <div className="order-details__timeline-step">
            <div className="order-details__timeline-icons">
              <Check
                className={`order-details__timeline-icon delivered`}
                size={30}
              />
            </div>
            <div className="order-details__timeline-info">
              <h1>Delivered</h1>
              <p>
                {new Date(orderDetails.statusUpdatedAt)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")
                  .replace(" ", " - ")}
              </p>
            </div>
          </div>
        )}

        {status === "cancelled" && (
          <div className="order-details__timeline-step">
            <div className="order-details__timeline-icons">
              <LucideCross
                className={`order-details__timeline-icon cancelled`}
                size={30}
              />
            </div>
            <div className="order-details__timeline-info">
              <h1>Cancelled</h1>
              <p>
                {new Date(orderDetails.statusUpdatedAt)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")
                  .replace(" ", " - ")}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="order-details__content-wrapper">
        {/* Order Items */}
        <div className="order-details__items">
          <h1 className="order-details__items-title">
            Order Items ({orderDetails.items?.length})
          </h1>
          <div className="order-details__table-wrapper">
            <table className="order-details__table">
              <thead className="order-details__table-head">
                <tr className="order-details__table-row">
                  <th>Image</th>
                  <th>Product</th>
                  <th>Details</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items?.length > 0 &&
                  orderDetails.items.map((item, index) => (
                    <tr key={index} className="order-details__table-row">
                      <td className="order-details__table-cell">
                        <div className="order-details__image">
                          <img src={item.image} alt="Product" />
                        </div>
                      </td>
                      <td className="order-details__table-cell">
                        <h1>{item.title}</h1>
                      </td>
                      <td className="order-details__table-cell">
                        <div>
                          <h3>
                            {item.color?.length > 0 &&
                              `Color: ${item.color.join(", ")}`}
                            {item.color?.length > 0 &&
                              item.size?.length > 0 &&
                              ", "}
                            {item.size?.length > 0 &&
                              `Size: ${item.size.join(", ")}`}
                          </h3>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </td>
                      <td className="order-details__table-cell">
                        ${item.totalPrice}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Shipping & Billing Buttons */}
          <div className="order-details__info-buttons">
            <button
              onClick={() => {
                setStep(1);
                setIsActive(true);
              }}
              className={`order-details__info-button ${
                isActive && "order-details__info-button--active"
              }`}
            >
              Shipping Information
            </button>
            <button
              onClick={() => {
                setStep(2);
                setIsActive(false);
              }}
              className={`order-details__info-button ${
                !isActive && "order-details__info-button--active"
              }`}
            >
              Billing Information
            </button>
          </div>

          {/* Shipping Information */}
          {step === 1 && (
            <div className="order-details__info-section">
              <h2 className="order-details__info-title">
                Shipping Information
              </h2>
              <div className="order-details__info-content">
                <h3>
                  {orderDetails?.shippingDetails?.firstName +
                    " " +
                    orderDetails?.shippingDetails?.lastName}
                </h3>
                <p>{orderDetails?.shippingDetails?.address}</p>
                <p>{orderDetails?.shippingDetails?.email}</p>
                <p>{orderDetails?.shippingDetails?.country}</p>
              </div>
            </div>
          )}

          {/* Billing Information */}
          {step === 2 && (
            <div className="order-details__info-section">
              <h2 className="order-details__info-title">Billing Information</h2>
              <div className="order-details__info-content">
                <h3>
                  {orderDetails?.shippingDetails?.firstName +
                    " " +
                    orderDetails?.shippingDetails?.lastName}
                </h3>
                <p>{orderDetails?.shippingDetails?.address}</p>
                <p>{orderDetails?.shippingDetails?.email}</p>
                <p>{orderDetails?.shippingDetails?.country}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="order-details__summary">
          <div className="order-details__summary-box">
            <h1 className="order-details__summary-title">Order Summary</h1>
            <div className="order-details__summary-item">
              <h3>Subtotal</h3>
              <p>${orderDetails.orderTotal}</p>
            </div>
            <div className="order-details__summary-item">
              <h3>Shipping</h3>
              <p>${shippingFee}</p>
            </div>
            <div className="order-details__summary-item">
              <h3>Tax</h3>
              <p>${taxFee}</p>
            </div>
            <hr />
            <div className="order-details__summary-total">
              <h3>Total</h3>
              <p>
                ${parseFloat(orderDetails.orderTotal + shippingFee + taxFee)}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="order-details__payment">
            <h1>Payment Information</h1>
            <p>Credit Card ({orderDetails?.paymentMethod?.cardNo})</p>
          </div>

          {/* Help Section */}
          <div className="order-details__help">
            <h1>Need help?</h1>
            <p>
              If you have any questions or concerns about your order, our
              customer service team is here to help.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="order-details__button--support"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
