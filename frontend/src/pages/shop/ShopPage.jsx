import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import Title from "../../components/title/Title";
import Card from "../../components/card/Card";
import { useToast } from "../../context/ToastContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ShopPage = () => {
  const categories = ['men', 'women', 'kids', 'accessories', 'sale'];
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(300);
  const [sortOption, setSortOption] = useState('all');
  const { showToast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const categoriesSelectionHandler = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    setSelectedCategories(prev => isChecked ? [...prev, value] : prev.filter(val => val !== value));
  }

  const priceRangeHandler = (e) => {
    setMaxRange(e.target.value);
  }

  const sortHandler = (e) => {
    setSortOption(e.target.value);
  }

  const applyFilters = () => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );

      if (selectedCategories.includes('sale')) {
        filtered = filtered.filter(product => product.isOnSale);
      }

      if (selectedCategories.length === 1 && selectedCategories.includes('sale')) {
        filtered = allProducts.filter(product => product.isOnSale);
      }
    }

    if (maxRange < 300) {
      filtered = filtered.filter(product => Number(product.price) <= maxRange);
    }

    switch (sortOption.toLowerCase()) {
      case "featured":
        filtered = filtered.filter((item) => item.isFeatured);
        break;
      case "newest arrivals":
        filtered = filtered.filter((item) => item.isNeww);
        break;
      case "low to high":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "high to low":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxRange(300);
    setSortOption('all');
  }

  useEffect(() => {
    applyFilters();
  }, [allProducts, selectedCategories, maxRange, sortOption]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/products`);
      if (res.data.success) {
        setProducts([...res.data.products]);
        setAllProducts([...res.data.products]);
      } else {
        showToast("error", "Error fetching products");
      }
    } catch (error) {
      showToast("error", error);
    }
  }

  useEffect(() => {
    if (category) {
      if (category.toLowerCase() === 'new') {
        setSortOption('newest arrivals');
      } else {
        setSelectedCategories(prev => prev.includes(category) ? prev : [category])
      }
    } else {
      clearFilters();
    }
  }, [category])

  useEffect(() => {
    console.log(products.length, allProducts.length)
  }, [products, allProducts])


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section>
      <Title
        title="Shop Our Collection"
        description="Discover our curated selection of premium clothing and accessories for every occasion."
      />
      <div className="shop-container">
        <aside className="filters">
          <div className="top-layer">
            <h1>Filters</h1>
            <h2 style={{ cursor: "pointer" }} onClick={clearFilters}>Clear all</h2>
          </div>
          <div className="middle-layer">
            <h1>Categories</h1>
            <div className="filters--checkbox-buttons">
              {categories.map((category, index) => (
                <div key={index} className="filters-checkbox-field">
                  <label>
                    <input
                      onChange={categoriesSelectionHandler}
                      value={category}
                      type="checkbox" className="input"
                      checked={selectedCategories.includes(category)}
                    />
                    <span className="custom-checkbox"></span>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="bottom-layer">
            <h1>Price Range</h1>
            <input onChange={priceRangeHandler} type="range" min="0" max="300" value={maxRange} />
            <div className="filters--price-range-prices">
              <span>{minRange}$</span>
              <span>{maxRange}$</span>
            </div>
          </div>
        </aside>
        <main className="shop-main">
          <div className="top-layer">
            <h1>Showing {products.length} products</h1>
            <select value={sortOption} onChange={sortHandler}>
              <option value="all">All</option>
              <option value="featured">Featured</option>
              <option value="newest arrivals">Newest Arrivals</option>
              <option value="low to high">Low to High</option>
              <option value="high to low">High to Low</option>
            </select>
          </div>
          <div className="middle-layer">
            {products.length === 0 ? <p>Loading...</p> : products.map((product) => (
              <Card
                key={product._id}
                _id={product._id}
                type={product.type}
                image={product.image}
                title={product.title}
                price={product.price}
                isNeww={product.isNeww}
                isOnSale={product.isOnSale}
                discountPercentage={product.discountPercentage}
                originalPrice={product.originalPrice}
                inStock={product.inStock}
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default ShopPage;