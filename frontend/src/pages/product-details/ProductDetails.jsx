// Imports
import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bus,
  Heart,
  Share,
  ShieldCheck,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

// Component Function
const ProductDetails = () => {
  // Declarations
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { addToCart, handleWishListItems, removeFromWishList, wishListData } = useCart();
  const [isLike, setIsLike] = useState(!!wishListData.find(item => item._id === id));
  const [quantity, setQuantity] = useState(1);
  const [title, setTitle] = useState('');
  const { showToast } = useToast();

  // Functions
  const handleAddToCart = () => {
    const dataAddToCart = {
      _id: id,
      colors,
      sizes,
      quantity,
      image,
      price,
      title
    };
    addToCart(dataAddToCart);
  };

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/products/${id}`);
      if (res.data.success) {
        return res.data.product;
      } else {
        showToast("error", "Error fetching details")
      }
    } catch (error) {
      showToast("error", error);
    }
  }

  // useEffect Hooks
  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductDetails();
      if (product) {
        setData(product);
        setImage(product.image);
        setColors([Object.keys(product.color)[0]]);
        setSizes([product.size[0]]);
        setPrice(product.price);
        setTitle(product.title);
      }
    };
    getProduct();
  }, [id]);

  //   Return Component
  return !data ? (<p>Loading...</p>) : (<div className="product-details">
    {/* Back to Shop Button */}
    <h3
      onClick={() => navigate("/shop")}
      className="product-details__back-button"
    >
      <ArrowLeft size={15} />
      Back to Shop
    </h3>

    <div className="product-details__content">
      {/* Left: Images Section */}
      <div className="product-details__images">
        <div className="product-details__image-main">
          <img src={image} alt="Main Product" />
        </div>
        <div className="product-details__image-thumbnails">
          {data.images.map((item, i) => (
            <div key={i} className="product-details__image-thumbnail">
              <img
                onClick={(e) => {
                  const img = e.target.src;
                  setImage(img);
                }}
                src={item}
                alt={`Thumbnail ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Info Section */}
      <div className="product-details__info">
        {/* Labels */}
        <div className="product-details__labels">
          {(data.isNew || data.isFeatured || data.isOnSale) && (
            <div className="product-details__labels-item">
              {data.isNew && (
                <span className="product-details__label product-details__label--new">
                  New Arrival
                </span>
              )}
              {data.isFeatured && (
                <span className="product-details__label product-details__label--featured">
                  Featured
                </span>
              )}
              {data.isOnSale && (
                <span className="product-details__label product-details__label--sale">
                  Sale
                </span>
              )}
            </div>
          )}
          <span className="product-details__label product-details__label--category">
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </span>
        </div>

        <h1 className="product-details__title">{title}</h1>
        <h2 className="product-details__price">
          ${data.price}{" "}
          {data.isOnSale && (
            <s className="product-details__price--original">
              ${data.originalPrice}
            </s>
          )}
        </h2>
        <p className="product-details__description">{data.description}</p>

        {/* Color Selection */}
        <div className="product-details__color">
          <h1 className="product-details__color-title">
            Color:{" "}
            {colors.map((colorName, i) => (
              <span key={i}>
                {colorName}
                {i !== colors.length - 1 && ","}{" "}
              </span>
            ))}
          </h1>
          <div className="product-details__color-options">
            {Object.entries(data.color).map(([colorName, colorCode], i) => (
              <div
                onClick={() =>
                  setColors(
                    (prevColors) =>
                      prevColors.includes(colorName)
                        ? prevColors.filter((color) => color !== colorName) // Remove if exists
                        : [...prevColors, colorName] // Add if not exists
                  )
                }
                style={{ backgroundColor: colorCode }}
                key={i}
                className={`product-details__color-option ${colors.includes(colorName) &&
                  "product-details__color-option--active"
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="product-details__size">
          <div className="product-details__size-header">
            <h1 className="product-details__size-title">
              Size:{" "}
              {sizes.map((item, i) => (
                <span key={i}>
                  {item}
                  {i !== sizes.length - 1 && ","}
                </span>
              ))}
            </h1>
            <h2 className="product-details__size-guide">Size Guide</h2>
          </div>
          <div className="product-details__size-options">
            {data.size.map((item, i) => (
              <div
                onClick={() =>
                  setSizes((prevSizes) =>
                    prevSizes.includes(item)
                      ? prevSizes.filter((s) => s !== item)
                      : [...prevSizes, item]
                  )
                }
                key={i}
                className={`product-details__size-option ${sizes.includes(item) &&
                  "product-details__size-option--active"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
          <p
            style={{
              color: data.inStock ? "#28a745" : "#dc3545",
            }}
          >
            {data.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Quantity & Actions */}
        <div className="product-details__actions">
          <div className="product-details__quantity">
            <div
              onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
              className="product-details__quantity-decrease"
            >
              -
            </div>
            <div className="product-details__quantity-value">{quantity}</div>
            <div
              onClick={() => setQuantity((prev) => prev + 1)}
              className="product-details__quantity-increase"
            >
              +
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="product-details__add-to-cart"
          >
            <ShoppingCart />
            Add to Cart
          </button>

          <div className="product-details__wishlist-share">
            <div
              onClick={() => {
                setIsLike((prev) => !prev);
                !isLike
                  ? handleWishListItems({ _id: data._id, image: data.image, title: data.title, price: data.price, inStock: data.inStock })
                  : removeFromWishList(data._id);
              }}
              className="product-details__wishlist"
            >
              <Heart
                fill={`${isLike ? "red" : "transparent"}`}
                stroke={`${isLike ? "red" : "rgb(75, 85, 99)"}`}
              />
            </div>
            <div className="product-details__share">
              <Share stroke="rgb(75, 85, 99)" />
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="product-details__extra-info">
          <div className="product-details__extra-item">
            <Bus className="product-details__extra-item--bus" />
            <p>
              Free Shipping Over <br /> $100
            </p>
          </div>
          <div className="product-details__extra-item">
            <Ticket className="product-details__extra-item--ticket" />
            <p>30-day returns</p>
          </div>
          <div className="product-details__extra-item">
            <ShieldCheck className="product-details__extra-item--shield" />
            <p>2-year warranty</p>
          </div>
        </div>

        <hr className="product-details__divider" />

        {/* Details, Sizing, Care */}
        <div className="product-details__tabs">
          <div
            onClick={() => setStep(1)}
            className={`product-details__tab ${step === 1 && "product-details__tab--active"
              }`}
          >
            Details
          </div>
          <div
            onClick={() => setStep(2)}
            className={`product-details__tab ${step === 2 && "product-details__tab--active"
              }`}
          >
            Sizing
          </div>
          <div
            onClick={() => setStep(3)}
            className={`product-details__tab ${step === 3 && "product-details__tab--active"
              }`}
          >
            Care
          </div>
        </div>

        <div className="product-details__tab-content">
          {step === 1 ? (
            <>
              <p>{data.details}</p>
            </>
          ) : step === 2 ? (
            <>
              <p>{data.sizing}</p>
            </>
          ) : (
            <>
              <p>{data.care}</p>
            </>
          )}
        </div>
      </div>
    </div>
  </div>)
};

export default ProductDetails;
