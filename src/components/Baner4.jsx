import React from "react";
import { Link } from "react-router-dom";
import "./BannerCard.css";

const BannerCard = ({ altText = "Promoción", large = true }) => {
  const desktopImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749580752/wj3zvwf28zr2certugcf.png";
  const mobileImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749580646/zpfxk4qe6vvqrlsgmzkm.png";

  return (
    <div className="container">
      <Link to="/categorias/Almacenid?search=Cafe" className="banner-link">
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
