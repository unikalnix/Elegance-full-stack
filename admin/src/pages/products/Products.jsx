import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import "./Products.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const navigate = useNavigate();
  const listAllProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/list`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllProducts(res.data.allProducts);
        
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        listAllProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    listAllProducts();
  }, []);

  useEffect(() => {
    
  }, [allProducts]);

  const filteredProducts = allProducts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(product => {
      const matchesSearch = 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === "" || product.category === categoryFilter;
      
      const matchesStock = 
        stockFilter === "" || 
        (stockFilter === "in-stock" && product.inStock) ||
        (stockFilter === "out-of-stock" && !product.inStock);
  
      return matchesSearch && matchesCategory && matchesStock;
    });

  return (
    <div className="products">
      <div className="products__header">
        <div>
          <h1 className="products__title">Products</h1>
          <span className="products__count">Total: {filteredProducts.length}</span>
        </div>
        <button
          onClick={() => navigate("/product-details/add")}
          className="products__add-button"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="products__filters">
        <div className="products__search">
          <Search size={18} className="products__search-icon" />
          <input
            type="text"
            className="products__search-input"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products__filter">
          <Filter size={18} className="products__filter-icon" />
          <select 
            className="products__filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="products__filter">
          <Filter size={18} className="products__filter-icon" />
          <select 
            className="products__filter-select"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="products__table-container">
        <table className="products__table">
          <thead className="products__table-head">
            <tr>
              <th className="products__table-header">ID</th>
              <th className="products__table-header">Image</th>
              <th className="products__table-header">Title</th>
              <th className="products__table-header">Category</th>
              <th className="products__table-header">Price</th>
              <th className="products__table-header">Stock</th>
              <th className="products__table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="products__table-body">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="products__table-row">
                  <td className="products__table-cell">{index + 1}</td>
                  <td className="products__table-cell">
                    <div className="products__image-container">
                      <img
                        src={product.image || null}
                        alt={product.title}
                        className="products__image"
                      />
                    </div>
                  </td>
                  <td className="products__table-cell products__title-cell">
                    {product.title}
                  </td>
                  <td className="products__table-cell products__category-cell">
                    {product.category}
                  </td>
                  <td className="products__table-cell products__price-cell">
                    ${product.price}
                  </td>
                  <td className="products__table-cell">
                    <span
                      className={`products__stock-badge ${
                        product.inStock
                          ? "products__stock-badge--in"
                          : "products__stock-badge--out"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="products__table-cell products__actions-cell">
                    <button
                      onClick={() =>
                        navigate(`/product-details/edit/${product._id}`)
                      }
                      className="products__action-button products__action-button--edit"
                    >
                      <Edit size={16} />
                      <span className="products__action-text">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="products__action-button products__action-button--delete"
                    >
                      <Trash2 size={16} />
                      <span className="products__action-text">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Products;
