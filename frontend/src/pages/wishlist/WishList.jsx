// Imports
import React, { useEffect } from "react";
import "./WishList.css";
import { ShoppingCart, Trash } from "lucide-react";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import useIsMobile from "../../hooks/useIsMobile";
import { useCart } from "../../context/CartContext";

// Component Function
const WishList = () => {
  // Declarations
  const isMobile = useIsMobile();
  const { wishListData, removeFromWishList, addToCart, getWishListItems } = useCart();

  useEffect(() => {
    getWishListItems()
  }, [])

  // Return Component
  return (
    <div className="wishlist">
      {/* Header Section */}
      <div className="wishlist__header">
        <h1 className="wishlist__title">My Wishlist</h1>
        <p className="wishlist__count">{wishListData.length} item{wishListData.length > 1 && 's'}</p>
      </div>

      {/* Breadcrumb Section */}
      <Breadcrumb links={["home", "dashboard", "wishlist"]} />

      {/* Wishlist Items */}
      <div className="wishlist__items">
        {wishListData?.length > 0 && wishListData.map((item, i) => (
          <div key={i} className="wishlist__item">
            {/* Product Info */}
            <div className="wishlist__item-info">
              <div className="wishlist__item-image">
                <img src={item.image} alt="Product" className="wishlist__item-img" />
              </div>
              <div className="wishlist__item-details">
                <h1 className="wishlist__item-title">{item.title}</h1>
                <p className="wishlist__item-price">${item.price}</p>
                <p
                  style={{
                    color: item.inStock ? "rgb(22, 163, 74)" : "rgb(220, 38, 38)",
                  }}
                  className="wishlist__item-status"
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="wishlist__item-actions">
              <button
                onClick={() => addToCart({ _id: item._id })}
                style={{
                  background: item.inStock ? "black" : "#CDD1D7",
                  cursor: item.inStock ? "pointer" : "auto",
                }}
                className="wishlist__item-btn--add"
              >
                <ShoppingCart
                  size={isMobile ? 15 : 20}
                  className="wishlist__item-icon"
                />
                Add to Cart
              </button>
              <button onClick={() => removeFromWishList(item._id)} className="wishlist__item-btn--delete">
                <Trash size={20} stroke="red" />
              </button>
            </div>

            {/* Divider */}
            <hr className="wishlist__divider" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
