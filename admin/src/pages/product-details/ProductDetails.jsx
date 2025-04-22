import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(
    location.pathname.split("/").includes("edit")
  );
  const navigate = useNavigate();

  const [tempImage, setTempImage] = useState("");
  const [tempColor, setTempColor] = useState({ name: "", code: "" });
  const [tempSize, setTempSize] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    image: "",
    title: "",
    description: "",
    images: [],
    price: "",
    category: "",
    discountPercentage: 0,
    colors: [],
    sizes: [],
    details: "",
    sizing: "",
    care: "",
    inStock: false,
    isFeatured: false,
    isOnSale: false,
    isNeww: false,
    originalPrice: "",
  });

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/list/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setProduct(res.data.product);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getValues = () => {
    if (isEdit) {
      setFormData({
        type: product?.type || "",
        image: product?.image || "",
        title: product?.title || "",
        description: product?.description || "",
        images: product?.images || [],
        price: product?.price || "",
        category: product?.category || "",
        discountPercentage: product?.discountPercentage || "",
        colors: Object.entries(product?.color || {}).map(([name, code]) => ({
          name,
          code,
        })),
        sizes: product?.size || [],
        details: product?.details || "",
        sizing: product?.sizing || "",
        care: product?.care || "",
        inStock: product?.inStock || false,
        isFeatured: product?.isFeatured || false,
        isOnSale: product?.isOnSale || false,
        isNeww: product?.isNeww || false,
        originalPrice: product?.originalPrice || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddImage = () => {
    if (!tempImage.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    if (formData.images.length >= 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, tempImage],
    }));
    setTempImage("");
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddColor = () => {
    if (!tempColor.name.trim() || !tempColor.code) {
      toast.error("Please enter both color name and code");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, tempColor],
    }));
    setTempColor({ name: "", code: "" });
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleAddSize = () => {
    if (!tempSize.trim()) {
      toast.error("Please enter a size");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, tempSize],
    }));
    setTempSize("");
  };

  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        ...formData,
        color: formData.colors.reduce((acc, { name, code }) => {
          acc[name] = code;
          return acc;
        }, {}),
        size: formData.sizes,
      };

      const endpoint = isEdit
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/edit/${id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/add`;

      const method = isEdit ? "post" : "post";

      const res = await axios[method](endpoint, transformedData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getProduct();
    }
    getValues();
  }, [id]);

  useEffect(() => {}, [formData]);

  useEffect(() => {}, [product]);

  useEffect(() => {
    if (isEdit && product && Object.keys(product).length > 0) getValues();
  }, [product]);
  return (
    <div className="product-details">
      <div className="product-details__header">
        <h2 className="product-details__title">
          {isEdit ? "Edit" : "Add"} Product
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="product-details__cancel-button"
        >
          Cancel
        </button>
      </div>

      <form className="product-details__form" onSubmit={handleSubmit}>
        <div className="product-details__form-grid">
          <div className="product-details__form-column">
            <div className="product-details__form-group">
              <label className="product-details__label">Product Type</label>
              <select
                className="product-details__select"
                name="type"
                value={formData?.type}
                onChange={handleChange}
              >
                <option value="category">Category</option>
                <option value="sale">Sale</option>
              </select>
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Title*</label>
              <input
                type="text"
                className="product-details__input"
                name="title"
                value={formData?.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Image*</label>
              <input
                type="text"
                className="product-details__input"
                name="image"
                value={formData?.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Description</label>
              <textarea
                className="product-details__textarea"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                rows={5}
              ></textarea>
            </div>

            <div className="product-details__form-row">
              <div className="product-details__form-group">
                <label className="product-details__label">Price*</label>
                <input
                  type="number"
                  className="product-details__input"
                  name="price"
                  value={formData?.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="product-details__form-group">
                <label className="product-details__label">Category*</label>
                <select
                  className="product-details__select"
                  name="category"
                  value={formData?.category}
                  onChange={handleChange}
                  required
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">
                Discount Percentage
              </label>
              <input
                type="number"
                className="product-details__input"
                name="discountPercentage"
                value={formData?.discountPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                disabled={!formData.isOnSale}
              />
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Details</label>
              <textarea
                className="product-details__textarea"
                name="details"
                value={formData?.details}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>

            <div className="product-details__form-row">
              <div className="product-details__form-group">
                <label className="product-details__label">Sizing</label>
                <input
                  type="text"
                  className="product-details__input"
                  name="sizing"
                  value={formData?.sizing}
                  onChange={handleChange}
                />
              </div>

              <div className="product-details__form-group">
                <label className="product-details__label">Care</label>
                <input
                  type="text"
                  className="product-details__input"
                  name="care"
                  value={formData?.care}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="product-details__form-column">
            <div className="product-details__form-group">
              <label className="product-details__label">
                Additional Images
              </label>
              <div className="product-details__input-with-button">
                <input
                  type="text"
                  className="product-details__input"
                  placeholder="Enter image URL"
                  value={tempImage}
                  onChange={(e) => setTempImage(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="product-details__add-button"
                >
                  Add
                </button>
              </div>

              <div className="product-details__images-list">
                {formData.images.map((img, index) => (
                  <div key={index} className="product-details__image-item">
                    <span className="product-details__image-url">{img}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="product-details__remove-button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Colors</label>
              <div className="product-details__input-with-button">
                <input
                  type="text"
                  className="product-details__input"
                  placeholder="Color name (e.g. red)"
                  value={tempColor.name}
                  onChange={(e) =>
                    setTempColor((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="color"
                  className="product-details__color-picker"
                  value={tempColor.code}
                  onChange={(e) =>
                    setTempColor((prev) => ({ ...prev, code: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="product-details__add-button"
                >
                  Add
                </button>
              </div>

              <div className="product-details__colors-list">
                {formData.colors.map((color, index) => (
                  <div key={index} className="product-details__color-item">
                    <span
                      className="product-details__color-swatch"
                      style={{ backgroundColor: color.code }}
                    ></span>
                    <span className="product-details__color-name">
                      {color.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="product-details__remove-button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details__form-group">
              <label className="product-details__label">Sizes</label>
              <div className="product-details__input-with-button">
                <input
                  type="text"
                  className="product-details__input"
                  placeholder="Size (e.g. S, M, L, XL)"
                  value={tempSize}
                  onChange={(e) => setTempSize(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="product-details__add-button"
                >
                  Add
                </button>
              </div>

              <div className="product-details__sizes-list">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="product-details__size-item">
                    <span className="product-details__size-value">{size}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="product-details__remove-button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-details__form-checkboxes">
              <div className="product-details__checkbox-group">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  className="product-details__checkbox"
                  checked={formData?.inStock}
                  onChange={handleChange}
                />
                <label
                  htmlFor="inStock"
                  className="product-details__checkbox-label"
                >
                  In Stock
                </label>
              </div>

              <div className="product-details__checkbox-group">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  className="product-details__checkbox"
                  checked={formData?.isFeatured}
                  onChange={handleChange}
                />
                <label
                  htmlFor="featured"
                  className="product-details__checkbox-label"
                >
                  Featured
                </label>
              </div>

              <div className="product-details__checkbox-group">
                <input
                  type="checkbox"
                  id="isOnSale"
                  name="isOnSale"
                  className="product-details__checkbox"
                  checked={formData?.isOnSale}
                  onChange={handleChange}
                />
                <label
                  htmlFor="onSale"
                  className="product-details__checkbox-label"
                >
                  On Sale
                </label>
              </div>

              <div className="product-details__checkbox-group">
                <input
                  type="checkbox"
                  id="isNeww"
                  name="isNeww"
                  className="product-details__checkbox"
                  checked={formData?.isNeww}
                  onChange={handleChange}
                />
                <label
                  htmlFor="newArrival"
                  className="product-details__checkbox-label"
                >
                  New Arrival
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__form-actions">
          <button
            type="button"
            className="product-details__cancel-button product-details__cancel-button--bottom"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
          <button type="submit" className="product-details__submit-button">
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
