import React from "react";
import { Link } from "react-router-dom";
import "./BannerCard.css";

const BannerCard = ({ altText = "Promoción", large = true }) => {
  const desktopImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749605970/y8usrdq0nteadcrwgy7j.png";
  const mobileImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749605969/c8nwmcrexvvkbjmaq8iu.png";

  return (
    <div className="container">
      <Link to="/categorias/Bebidasid?alcohol=sin" className="banner-link">
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
