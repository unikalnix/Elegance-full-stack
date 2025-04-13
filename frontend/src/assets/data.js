// Imports
import shirt from "../assets/images/shirt.jpeg";
import versace from "../assets/images/versace-removebg-preview.png";
import gucci from "../assets/images/gucci-removebg-preview.png";
import prada from "../assets/images/prada-removebg-preview.png";
import dior from "../assets/images/dior-removebg-preview.png";
import chanel from "../assets/images/chanel-removebg-preview.png";
import louis_vuitton from "../assets/images/louis_vuitton-removebg-preview.png";
export const shippingFee = 5.0;
export const taxFee = 5.0;

// Exports
export const categories = ["men", "women", "kids", "accessories", "sale"];
export const navItems = [
  "shop",
  "men",
  "women",
  "kids",
  "accessories",
  "sale",
  "about",
  "contact",
];
export const homeCategoriesData = [
  {
    _id: "1",
    type: "category",
    title: "Men",
    image: shirt,
    description: "Summer & Winter Collection",
  },
  {
    _id: "2",
    type: "category",
    title: "Women",
    image: shirt,
    description: "Summer & Winter Collection",
  },
  {
    _id: "3",
    type: "category",
    title: "Kids",
    image: shirt,
    description: "Summer & Winter Collection",
  },
  {
    _id: "4",
    type: "category",
    title: "Accessories",
    image: shirt,
    description: "Complete Your Look",
  },
  {
    _id: "4",
    type: "category",
    title: "Accessories",
    image: shirt,
    description: "Complete Your Look",
  },
];
export const brands = [
  {
    _id: "1",
    title: "Versace",
    image: versace,
  },
  {
    _id: "2",
    title: "Gucci",
    image: gucci,
  },
  {
    _id: "3",
    title: "Prada",
    image: prada,
  },
  {
    _id: "4",
    title: "Dior",
    image: dior,
  },
  {
    _id: "5",
    title: "Chanel",
    image: chanel,
  },
  {
    _id: "6",

    title: "Louis Vuitton",
    image: louis_vuitton,
  },
];

export const footerLinks = [
  {
    _id: "1",
    title: "Shop",
    links: [
      { name: "Men", path: "#" },
      { name: "Women", path: "#" },
      { name: "Kids", path: "#" },
      { name: "Accessories", path: "#" },
      { name: "Sale", path: "#" },
    ],
  },
  {
    _id: "2",
    title: "Company",
    links: [
      { name: "About Us", path: "#" },
      { name: "Careers", path: "#" },
      { name: "Store Locator", path: "#" },
      { name: "Sustainability", path: "#" },
      { name: "Press", path: "#" },
    ],
  },
  {
    _id: "3",
    title: "Customer Service",
    links: [
      { name: "Contact Us", path: "#" },
      { name: "FAQs", path: "#" },
      { name: "Shipping & Returns", path: "#" },
      { name: "Size Guide", path: "#" },
      { name: "Privacy Policy", path: "#" },
    ],
  },
];

export const collection = [
  {
    _id: "1",
    type: "sale",
    title: "Classic Denim Jacket",
    description:
      "A versatile denim jacket crafted with premium cotton blend, providing comfort and a stylish look for any occasion.",
    price: "79.99",
    images: [shirt, chanel, louis_vuitton, gucci],
    color: {
      "Midnight Blue": "#191970",
      "Stone Gray": "#8C8C8C",
      "Forest Green": "#228B22",
      "Burgundy Red": "#800020",
    },
    size: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    image: shirt,
    discountPercentage: 0,
    originalPrice: "79.99",
    category: "kids",
    inStock: true,
  },
  {
    _id: "2",
    type: "sale",
    title: "Slim Fit Chinos",
    description:
      "Tailored slim-fit chinos designed for everyday wear, made with breathable and stretchable fabric for maximum comfort.",
    price: "69.99",
    images: [shirt, chanel, louis_vuitton, gucci],
    color: {
      Khaki: "#C3B091",
      "Navy Blue": "#000080",
      "Charcoal Gray": "#36454F",
      "Olive Green": "#6B8E23",
    },
    size: ["28", "30", "32", "34", "36"],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    image: shirt,
    discountPercentage: 15,
    originalPrice: "79.99",
    category: "men",
    inStock: true,
  },
  {
    _id: "3",
    type: "sale",
    title: "Casual Linen Shirt",
    description:
      "A lightweight linen shirt perfect for warm weather, offering a breathable and relaxed fit with a modern touch.",
    price: "59.99",
    images: [shirt, chanel, louis_vuitton, gucci],
    color: {
      "Sky Blue": "#87CEEB",
      Beige: "#F5F5DC",
      White: "#FFFFFF",
      "Coral Pink": "#F88379",
    },
    size: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    image: shirt,
    discountPercentage: 0,
    originalPrice: "59.99",
    category: "men",
    inStock: false,
  },
  {
    _id: "4",
    type: "sale",
    title: "Leather Chelsea Boots",
    description:
      "A timeless pair of Chelsea boots crafted with genuine leather, featuring a sleek design and durable sole for long-lasting wear.",
    price: "129.99",
    images: [shirt, chanel, louis_vuitton, gucci],
    color: {
      "Deep Brown": "#654321",
      "Jet Black": "#000000",
      Chestnut: "#CD853F",
      "Steel Gray": "#808080",
    },
    size: ["7", "8", "9", "10", "11"],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    image: shirt,
    discountPercentage: 20,
    originalPrice: "159.99",
    category: "men",
    inStock: false,
  },
];