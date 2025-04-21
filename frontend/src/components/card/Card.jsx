// Imports
import React, { useContext, useEffect, useState } from "react";
import "./Card.css";
import { Heart, ShoppingCartIcon } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Component Function
const Card = ({
  _id,
  type,
  image,
  title,
  description,
  price,
  isNeww,
  isOnSale,
  discountPercentage,
  originalPrice,
  inStock,
}) => {
  // Declarations
  const [isHovered, setIsHovered] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    addToCart,
    removeFromCart,
    handleWishListItems,
    removeFromWishList,
    cartData,
    wishListData,
  } = useCart();

  // Return Component
  return (
    <div
      className="card-container"
      onClick={
        type === "sale"
          ? () => navigate(`/product-details/${_id}`)
          : () => navigate(`/shop?category=${title.toLowerCase()}`)
      }
      style={{
        height: type === "category" ? "300px" : "375px",
        transform: isHovered
          ? type === "sale"
            ? "translateY(-8px)"
            : "none"
          : "translateY(0)",
        transition: "transform 0.3s",
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img src={image} alt={title} />
        <div className="overlay"></div>
      </div>
      {type === "category" && (
        <div className="category-content">
          <h1 className={`${isMobile && "text-black"}`}>{title}</h1>
          <p className={`${isMobile && "text-black"}`}>{description}</p>
        </div>
      )}

      {type === "sale" && (
        <div className="sale-content">
          <h3>{title}</h3>
          <div className="sale--price">
            <p>${price}</p>
            {isOnSale && <s className="original-price">${originalPrice}</s>}
          </div>
        </div>
      )}

      {type === "sale" && (
        <div className="flags">
          {isNeww && <span className="new-flag">New</span>}
          {isOnSale && <span className="sale-flag">{discountPercentage}%</span>}
        </div>
      )}

      {type === "sale" && (
        <div className="card-icons">
          <Heart
            onClick={(e) => {
              e.stopPropagation();
              setIsLike((prev) => !prev);
              !isLike
                ? handleWishListItems({ _id, image, title, price, inStock })
                : removeFromWishList(_id);
            }}
            size={40}
            fill={
              wishListData.length > 0 &&
              wishListData.find((item) => item._id === _id)
                ? "red"
                : "#00000000"
            }
            stroke={
              wishListData.length > 0 &&
              wishListData.find((item) => item._id === _id)
                ? "red"
                : "black"
            }
          />
          <ShoppingCartIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsAddToCart((prev) => !prev);
              !isAddToCart
                ? addToCart({
                    _id,
                    title,
                    colors: [],
                    sizes: [],
                    image,
                    price,
                  })
                : removeFromCart(_id);
            }}
            size={40}
            fill={
              cartData.length > 0 &&
              cartData.find((item) => item.productId === _id)
                ? "black"
                : "#00000000"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Card;
