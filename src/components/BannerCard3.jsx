import React from "react";
import "./BannerCard.css";

const BannerCard = ({ altText = "Promoción", large = true }) => {
  const desktopImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749521158/r1xktwif6azninqadrtb.webp";
  const mobileImageUrl = "https://res.cloudinary.com/dcggcw8df/image/upload/v1749520929/hw7rhnoghz3kdhqgxmwh.webp";

  return (
    <div className="container">
      <div className={`andes-card banner-card andes-card--animated andes-card--flat andes-card--padding-16 ${large ? "banner-large" : ""}`}>
        {/* Imagen de fondo para escritorio */}
        <div
          className="banner-image"
          style={{ backgroundImage: `url(${desktopImageUrl})` }}
          aria-label={altText}
        />
        {/* Imagen para móviles */}
        <img
          src={mobileImageUrl}
          alt={altText}
          className="mobile-banner-image"
        />
      </div>
    </div>
  );
};

export default BannerCard;
