// Imports
import React, { useEffect, useState } from "react";
import "./Cart.css";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import { ChevronLeftIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { shippingFee, taxFee } from "../../assets/data";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

// Component Function
const Cart = () => {
  // Declarations
  const navigate = useNavigate();
  const { cartData, getCart, removeFromCart, updateCart } = useCart();
  const { isLogin } = useAuth();
  const { showToast } = useToast();
  const [quantities, setQuantities] = useState([]);
  const subtotal = cartData.reduce((acc, item, index) => {
    return acc + item.price * (quantities[index] || item.quantity);
  }, 0);
  const total = subtotal + shippingFee + taxFee;

  const updateQuantities = (increase, index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => {
        if (i === index) {
          const newQty = increase ? qty + 1 : Math.max(qty - 1, 1);
          return newQty;
        }
        return qty;
      })
    );
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      setQuantities(cartData.map((item) => item.quantity));
    }
  }, [cartData]);

  // Return Component
  return (
    <div className="cart">
      <Breadcrumb links={["Home", "Cart"]} />
      <h1 className="cart__title">Shopping Cart</h1>
      <div className="cart__container">
        {/* Cart items */}
        <div className="cart__items">
          <table className="cart__table">
            <thead className="cart__table-header">
              <tr className="cart__table-header--row">
                <th className="cart__table-head">Product</th>
                <th className="cart__table-head">Price</th>
                <th className="cart__table-head">Quantity</th>
                <th className="cart__table-head">Total</th>
              </tr>
            </thead>
            <tbody className="cart__table-body">
              {cartData.length > 0 &&
                cartData.map((item, index) => (
                  <tr key={index} className="cart__item-body--row">
                    <td className="cart__item-info">
                      <div className="cart__item-details">
                        <div className="cart__item-image">
                          <img src={item.image} alt="Product" />
                        </div>
                        <div className="cart__item-description">
                          <h1 className="cart__item-title">{item.title}</h1>
                          <p className="cart__item-variants">
                            {/* Color: White, Size: M */}
                            {item.color.length > 0 &&
                              item.color.map((color, index) => {
                                return (
                                  <span key={index}>
                                    {color}
                                    {index !== item.color.length - 1 && ","}
                                  </span>
                                );
                              })}
                            <br />
                            {item.size.length > 0 &&
                              item.size.map((size, index) => {
                                return (
                                  <span key={index}>
                                    {size}
                                    {index !== item.size.length - 1 && ","}
                                  </span>
                                );
                              })}
                          </p>
                        </div>
                        <div className="cart__item-remove">
                          <Trash
                            onClick={() => removeFromCart(item.productId)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="cart__item-price">
                      <p>${item.price}</p>
                    </td>
                    <td className="cart__item-quantity">
                      <div className="cart__quantity-control">
                        <div
                          className="cart__quantity-decrease"
                          onClick={() => updateQuantities(false, index)}
                        >
                          -
                        </div>
                        <div className="cart__quantity-value">
                          {quantities[index]}
                        </div>
                        <div
                          className="cart__quantity-increase"
                          onClick={() => updateQuantities(true, index)}
                        >
                          +
                        </div>
                      </div>
                    </td>

                    <td className="cart__item-total">
                      ${(item.price * quantities[index]).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="cart__actions">
            <button
              onClick={() => navigate("/shop")}
              className="cart__continue-shopping"
            >
              <ChevronLeftIcon />
              Continue Shopping
            </button>
            <button
              onClick={() => {
                const updatedCart = cartData.map((item, index) => ({
                  _id: item.productId,
                  quantity: quantities[index],
                }));
                updateCart(updatedCart);
              }}
              className="cart__update"
            >
              Update Cart
            </button>
          </div>
        </div>

        {/* Cart Order summary */}
        <div className="cart__summary">
          <h1 className="cart__summary-title">Order Summary</h1>
          <div className="cart__summary-row">
            <h1 className="cart__summary-label">Subtotal</h1>
            <p className="cart__summary-total-value">${subtotal.toFixed(2)}</p>
          </div>
          <div className="cart__summary-row">
            <h1 className="cart__summary-label">Shipping</h1>
            <p className="cart__summary-value">${shippingFee}</p>
          </div>
          <div className="cart__summary-row">
            <h1 className="cart__summary-label">Estimated tax</h1>
            <p className="cart__summary-value">${taxFee}</p>
          </div>
          <hr className="cart__divider" />
          <div className="cart__summary-total">
            <h1 className="cart__summary-total-label">Total</h1>
            <p className="cart__summary-total-value">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => {
              isLogin
                ? navigate("/checkout")
                : showToast("info", "Please login");
            }}
            className="cart__checkout"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
