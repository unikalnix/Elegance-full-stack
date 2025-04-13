// Imports
import React from "react";
import "./Footer.css";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { footerLinks } from "../../assets/data";

// Component Function
const Footer = () => {
  // Return Component
  return (
    <footer className="footer">
      <div className="f1">
        <h1>Elegance</h1>
        <p>
          Premium fashion for the modern individual. Quality craftsmanship and
          timeless designs for those who appreciate elegance.
        </p>
        <div className="f1--social-links">
          <InstagramIcon className="instagram-icon" />
          <FacebookIcon className="facebook-icon" />
          <TwitterIcon className="twitter-icon" />
        </div>
      </div>
      {footerLinks.map((item) => {
        return (
          <div key={item._id} className={`f${Number(item._id) + 1}`}>
            <h1>{item.title}</h1>
            <ul>
              {item.links.map((link, index) => (
                <li key={`${item._id}-${index}`} to={link.path}>
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;
