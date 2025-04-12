import React from "react";
import "./HorizontalScroll.css";

const items = [
    {
      image: "https://http2.mlstatic.com/D_NQ_NP2X_740285-MLA81157648257_122024-O.webp",
      alt: "Protectores solares",
      link: "https://listado.mercadolibre.com.ar/supermercado/_Container_mk-spm-solares"
    },
    {
      image: "https://http2.mlstatic.com/D_NQ_NP2X_835746-MLA81157716337_122024-O.webp",
      alt: "Cuidado del cabello",
      link: "https://listado.mercadolibre.com.ar/supermercado/cuidado-del-cabello"
    },
    {
      image: "https://http2.mlstatic.com/D_NQ_NP2X_869712-MLA81157619195_122024-O.webp",
      alt: "Incontinencia",
      link: "https://listado.mercadolibre.com.ar/supermercado/incontinencia"
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
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={item.image} alt={item.alt} />
        </a>
      ))}
    </div>
  );
};

export default HorizontalScroll;
