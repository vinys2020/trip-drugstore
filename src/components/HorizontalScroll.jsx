import React from "react";
import "./HorizontalScroll.css";

const items = [
  {
    image: "https://http2.mlstatic.com/D_NQ_NP2X_910241-MLA83418775476_042025-B.webp",
    alt: "Cafe, te y Yerba",
    link: "/categorias/Almacenid"
  },
  {
    image: "https://http2.mlstatic.com/D_NQ_NP2X_893232-MLA83761115815_042025-B.webp",
    alt: "Gaseosas y Aguas",
    link: "/categorias/Bebidasid?alcohol=sin"
  },
  {
    image: "https://http2.mlstatic.com/D_NQ_NP2X_678714-MLA83710941603_042025-B.webp",
    alt: "Almacén",
    link: "/categorias/Almacenid"
  }
];


const HorizontalScroll = () => {
  return (
    <div className="scroll-container">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="scroll-card"
          target=""
          rel="noopener noreferrer"
        >
          <img src={item.image} alt={item.alt} />
        </a>
      ))}
    </div>
  );
};

export default HorizontalScroll;
