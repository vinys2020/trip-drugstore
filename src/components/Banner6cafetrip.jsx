import React from "react";
import { Link } from "react-router-dom";
import "./BannerCard.css";

const BannerCard = ({ altText = "Promoción", large = true }) => {
  const desktopImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749583727/tcme6rhhek1n2xgxwsyx.png";
  const mobileImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749583727/ur6dsf9fmwp8dkml8yeo.png";

  return (
    <div className="container">
      <Link to="/categorias/Tripcafeysandwichesid" className="banner-link">
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
