// Imports
import React, { useEffect, useState } from "react";
import "./Checkout.css";
import * as lucide from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { shippingFee, taxFee } from "../../assets/data";
import NotFound from "../../pages/not-found/NotFound";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

// Component Function
const Checkout = () => {
  // Declarations
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { cartData, getCart } = useCart();
  const { showToast } = useToast();
  // Shipping Infromation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const { isLogin } = useAuth();
  const [orderNo, setOrderNo] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const handleShippingDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/orders/checkout?type=shipping`,
        {
          shippingDetails: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            postCode,
            country,
          },
          billingDetails: { cardNo, expiryDate, cvc, nameOnCard },
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        setStep(2);
      } else {
        showToast("info", res.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const handleBillingDetails = async (e) => {
    e.preventDefault();
    console.log(cartData)
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/orders/checkout?type=billing`,
        {
          billingDetails: { cardNo, expiryDate, cvc, nameOnCard },
          shippingDetails: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            postCode,
            country,
          },
          cartData,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        setStep(3);
        setOrderNo(res.data.orderDetails.orderNo);
        setEstimatedDelivery(res.data.orderDetails.estimatedDelivery);
      } else {
        showToast("info", res.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  useEffect(() => {}, [orderNo, estimatedDelivery]);

  useEffect(() => {
    getCart();
  }, []);
  // Return Component
  return isLogin ? (
    <>
      <div className="checkout__header">
        <h1 className="checkout__title">Checkout</h1>
        <div className="checkout__steps">
          <div
            className={`checkout__step ${
              step === 1 && "checkout__step--active"
            }`}
          >
            <div className="checkout__step-number">1</div>
            <p className="checkout__step-label">Shipping</p>
          </div>
          <div
            className={`checkout__step ${
              step === 2 && "checkout__step--active"
            }`}
          >
            <div className="checkout__step-number">2</div>
            <p className="checkout__step-label">Payment</p>
          </div>
          <div
            className={`checkout__step ${
              step === 3 && "checkout__step--active"
            }`}
          >
            <div className="checkout__step-number">
              {step === 1 || step === 2 ? "3" : "✓"}
            </div>
            <p className="checkout__step-label">Confirmation</p>
          </div>
        </div>
      </div>

      <div className="checkout__content">
        <div className="checkout__summary">
          <h2 className="checkout__summary-title">Order Summary</h2>
          <div className="checkout__summary-items">
            {cartData.length > 0 &&
              cartData.map((item, index) => (
                <div key={item._id} className="checkout__summary-item">
                  <div className="checkout__summary-image">
                    <img src={item.image} alt="Product" />
                  </div>
                  <div className="checkout__summary-details">
                    <h3 className="checkout__summary-name">{item.title}</h3>
                    <p className="checkout__summary-variant">
                      {item.color.map((clr, index) => (
                        <span key={index}>
                          {clr}
                          {index !== item.color.length - 1 > 0 && ", "}
                        </span>
                      ))}
                      , Size{" "}
                      {item.size.map((sz, index) => (
                        <span key={index}>
                          {sz}
                          {index !== item.size.length - 1 > 0 && ", "}
                        </span>
                      ))}
                    </p>
                    <div className="checkout__summary-pricing">
                      <h4 className="checkout__summary-price">
                        ${item.price} x {item.quantity}
                      </h4>
                      <p className="checkout__summary-total">
                        ${Math.ceil(Number(item.price) * Number(item.quantity))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <hr className="checkout__divider" />

          <div className="checkout__summary-subtotal">
            <h3>Subtotal</h3>
            <p>
              $
              {cartData.length > 0
                ? cartData.reduce(
                    (acc, item) =>
                      Math.ceil(
                        acc + Number(item.quantity) * Number(item.price)
                      ),
                    0
                  )
                : 0}
            </p>
          </div>
          <div className="checkout__summary-shipping">
            <h3>Shipping</h3>
            <p>${shippingFee}</p>
          </div>
          <div className="checkout__summary-tax">
            <h3>Estimated Tax</h3>
            <p>${taxFee}</p>
          </div>

          <hr className="checkout__divider" />

          <div className="checkout__summary-total">
            <h3>Total</h3>
            <p>
              $
              {cartData.length > 0
                ? cartData.reduce(
                    (acc, item) =>
                      Math.ceil(
                        acc + Number(item.quantity) * Number(item.price)
                      ),
                    shippingFee + taxFee
                  )
                : 0}
            </p>
          </div>
        </div>

        {/* Shipping Details */}
        {step === 1 && (
          <div className="checkout__form-container">
            <h2 className="checkout__form-title">Shipping Information</h2>
            <form onSubmit={handleShippingDetails} className="checkout__form">
              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="firstName"
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="lastName"
                  />
                </div>
              </div>

              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                  />
                </div>
              </div>

              <div className="checkout__form-group">
                <label htmlFor="address">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                />
              </div>

              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label htmlFor="city">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    name="city"
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="state">State</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    name="state"
                  />
                </div>
              </div>

              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    type="text"
                    name="postalCode"
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    name="Country"
                  />
                </div>
              </div>

              <button type="submit" className="checkout__submit-button">
                Continue to Payment
              </button>
            </form>
          </div>
        )}
        {/* Payment Details */}
        {step === 2 && (
          <div className="checkout__form-container">
            <h2 className="checkout__form-title">
              Payment Details <lucide.CreditCard />
            </h2>
            <form onSubmit={handleBillingDetails} className="checkout__form">
              <div className="checkout__form-group">
                <label htmlFor="cardNo">Card Number</label>
                <input
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                  type="text"
                  name="cardNo"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="checkout__form-row">
                <div className="checkout__form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    type="text"
                    name="cvc"
                    placeholder="000"
                  />
                </div>
              </div>
              <div className="checkout__form-group">
                <label htmlFor="nameOnCard">Name on Card</label>
                <input
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  type="text"
                  name="nameOnCard"
                />
              </div>
              <button type="submit" className="checkout__submit-button">
                Pay{" "}
                {cartData.length > 0
                  ? cartData.reduce(
                      (acc, item) =>
                        Math.ceil(
                          acc + Number(item.quantity) * Number(item.price)
                        ),
                      shippingFee + taxFee
                    )
                  : 0}{" "}
                USD
              </button>
            </form>
          </div>
        )}
        {/* Confirmation */}
        {step === 3 && (
          <div className="checkout__confirmation">
            <div className="checkout__confirmation-icon"></div>
            <h1 className="checkout__confirmation-title">
              Thank you for your order
            </h1>
            <p className="checkout__confirmation-message">
              Your order has been placed and is being processed. You will
              receive a confirmation email shortly.
            </p>
            <div className="checkout__confirmation-details">
              <div className="checkout__confirmation-detail">
                <h1 className="checkout__confirmation-label">Order Number:</h1>
                <p className="checkout__confirmation-value">{orderNo}</p>
              </div>
              <div className="checkout__confirmation-detail">
                <h1 className="checkout__confirmation-label">
                  Estimated Delivery:
                </h1>
                <p className="checkout__confirmation-value">
                  {estimatedDelivery}
                </p>
              </div>
            </div>
            <div className="checkout__confirmation-actions">
              <button
                onClick={() => navigate("/orders")}
                className="checkout__confirmation-button checkout__confirmation-button--primary"
              >
                View Order Details
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="checkout__confirmation-button checkout__confirmation-button--secondary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default Checkout;
