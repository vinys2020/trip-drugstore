import React from "react";
import { Link } from "react-router-dom";
import "./BannerCard.css";

const BannerCard = ({ altText = "Promoción", large = true }) => {
  const desktopImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749590855/oui9dhi4mw99y5lhd6d5.png";
  const mobileImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749590855/anwwhrvqp2h0reytwxaf.png";

  return (
    <div className="container">
      <Link to="/categorias/golosinasychocolatesid" className="banner-link">
        <div className={`andes-card banner-card andes-card--animated andes-card--flat andes-card--padding-16 ${large ? "banner-large" : ""}`}>
          <div
            className="banner-image"
            style={{ backgroundImage: `url(${desktopImageUrl})` }}
            aria-label={altText}
          />
          <img
            src={mobileImageUrl}
            alt={altText}
            className="mobile-banner-image"
          />
        </div>
      </Link>
    </div>
  );
};

export default BannerCard;
