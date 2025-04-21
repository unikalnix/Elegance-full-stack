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
