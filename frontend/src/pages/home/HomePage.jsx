// Imports
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Hero from "../../components/hero/Hero";
import Card from "../../components/card/Card";
import { brands, homeCategoriesData } from "../../assets/data";
import { ArrowRight } from "lucide-react";
import Title from "../../components/title/Title";
import useIsMobile from "../../hooks/useIsMobile";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";

// Component Function
const HomePage = () => {
  const isMobile = useIsMobile();
  const [collection, setCollection] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchingProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/products`);
      if (res.data.success) {
        setCollection(res.data.products);
      } else {
        showToast("error", "Error fetching products");
      }
    } catch (error) {
      showToast("error", `Something went wrong ${error}`);
    }
  }

  useEffect(() => {
    fetchingProducts();
  }, []);

  // Return Component
  return (
    <>
      {/* Hero section */}
      <Hero />
      {/* Category section */}
      <section className="shop-by-category">
        <Title
          title="Shop by Category"
          description="Explore our curated collection of products for every need and occasion"
        />
        <div className="shop-by-category--cards">
          {homeCategoriesData.length > 4 && (
            <h6 onClick={() => navigate('/shop')} className="shop-by-category--cards--view-all-btn">
              View all categories
              <ArrowRight
                className="shop-by-category--cards--arrow-right"
                size={isMobile ? 16 : 20}
              />
            </h6>
          )}
          {homeCategoriesData.slice(0, 4).map((item) => (
            <Card
              key={item._id}
              _id={item._id}
              type={item.type}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
      {/* Exclusive Section */}
      <section className="exclusive-collection">
        <Title
          title="Exclusive Collection"
          description="Discover our premium selection of handcrafted pieces"
        />
        <div className="exclusive-collection--cards">
          {collection.length > 4 && (
            <h6 onClick={() => navigate('/shop?category=new')} className="exclusive-collection--cards--view-all-btn">
              View all collection
              <ArrowRight
                className="exclusive-collection--cards--arrow-right"
                size={20}
              />
            </h6>
          )}
          {collection.filter(item => item.isNeww && !item.isOnSale).slice(0, 4).map((item) => {
            return (
              <Card
                _id={item._id}
                key={item._id}
                type={item.type}
                image={item.image}
                title={item.title}
                price={item.price}
                isNeww={item.isNeww}
                isOnSale={item.isOnSale}
                discountPercentage={item.discountPercentage}
                originalPrice={item.originalPrice}
                inStock={item.inStock}
              />
            );
          })}
        </div>
      </section>
      {/* Brands */}
      <section className="brands">
        <Title
          title="Premium Brands"
          description="Explore our collection from world-renowned luxury fashion houses"
        />
        <div className="brand-image">
          {brands.map((item) => {
            return <img key={item._id} src={item.image} alt={item.title} />;
          })}
        </div>
      </section>
      {/* Season sale */}
      <section className="season-sale">
        <Title
          title="Season Sale"
          description="Limited time offers on premium pieces from our collection"
        />
        <div className="season-sale--cards">
          {collection.length > 4 && (
            <h6 onClick={() => navigate('/shop?category=sale')} className="season-sale--cards--view-all-btn">
              View all Items
              <ArrowRight
                className="season-sale--cards--arrow-right"
                size={20}
              />
            </h6>
          )}
          {collection.filter(item => item.isOnSale).slice(0, 4).map((item) => {
            return (
              <Card
                _id={item._id}
                key={item._id}
                type={item.type}
                image={item.image}
                title={item.title}
                price={item.price}
                isOnSale={item.isOnSale}
                discountPercentage={item.discountPercentage}
                originalPrice={item.originalPrice}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HomePage;
