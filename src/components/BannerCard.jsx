import React from "react";
import "./BannerCard.css";

// Importa las imágenes locales desde la carpeta assets
import promocion from "../assets/promocion.webp";
import promocioncell from "../assets/promocioncell.webp";

const BannerCard = ({ altText, large }) => {
  return (
    <div className="container my-4">
      <div className={`andes-card banner-card andes-card--animated andes-card--flat andes-card--padding-16 ${large ? "banner-large" : ""}`}>
        {/* Imagen de fondo para escritorio */}
        <div
          className="banner-image"
          style={{ backgroundImage: `url(${promocion})` }}
          alt={altText}
        />
        {/* Imagen para móviles */}
        <img
          src={promocioncell}
          alt={altText}
          className="mobile-banner-image"
        />
      </div>
    </div>
  );
};

export default BannerCard;
