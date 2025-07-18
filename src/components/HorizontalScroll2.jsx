import React from "react";
import { Link } from "react-router-dom";

import "./HorizontalScroll2.css";

const items = [
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_695687-MLA81364471168_122024-G.webp",
    alt: "OFERTAS",
    link: "/categorias/Ofertasid",
    title: "OFERTAS"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_702985-MLA81633888259_122024-G.webp",
    alt: "CAFÉ",
    link: "/categorias/Almacenid?search=Cafe",
    title: "CAFÉ"
  },
  
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_646735-MLA81364443724_122024-G.webp",
    alt: "LIMPIEZA",
    link: "/categorias/Articuloslimpiezaid",
    title: "LIMPIEZA"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_799360-MLA82317787351_022025-G.webp",
    alt: "SNAKS",
    link: "/categorias/Snacksygalletitasid",
    title: "SNAKS"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_833202-MLA81364584956_122024-G.webp",
    alt: "ALMACÉN",
    link: "/categorias/Almacenid",
    title: "ALMACÉN"
  },
  {
    image: "https://res.cloudinary.com/dcggcw8df/image/upload/v1749004549/joaleykybhc9rry0hlu2.png",
    alt: "JUGOS",
    link: "/categorias/Bebidasid?search=jugo",
    title: "JUGOS"
  }
];

const HorizontalScroll2 = () => {
  return (
    <div className="scroll-container-two mb-0 mb-lg-3">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="scroll-card-two"
        >
          <div className="image-container">
            <img src={item.image} alt={item.alt} />
          </div>
          <div className="card-title">{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalScroll2;
