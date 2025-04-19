import React from "react";
import "./HorizontalScroll2.css";

const items = [
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_695687-MLA81364471168_122024-G.webp",
    alt: "OFERTAS",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Discount_20-100#c_container_id=not_apply",
    title: "OFERTAS"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_702985-MLA81633888259_122024-G.webp",
    alt: "CAFÉ",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_black-friday-capsulas",
    title: "CAFÉ"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_646735-MLA81364443724_122024-G.webp",
    alt: "LIMPIEZA",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_descartables-2025",
    title: "LIMPIEZA"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_799360-MLA82317787351_022025-G.webp",
    alt: "SALUDABLES",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_mk-saludables25-cpg",
    title: "SALUDABLES"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_833202-MLA81364584956_122024-G.webp",
    alt: "LACTEOS",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_mk-leches-maternizadas-cpg",
    title: "LACTEOS"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_846703-MLA81564985462_012025-G.webp",
    alt: "MASCOTAS",
    link: "https://www.mercadolibre.com.ar/c/animales-y-mascotas",
    title: "MASCOTAS"
  }
];

const HorizontalScroll2 = () => {
  return (
    <div className="scroll-container-two">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="scroll-card-two"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="image-container">
            <img src={item.image} alt={item.alt} />
          </div>
          <div className="card-title">{item.title}</div>
        </a>
      ))}
    </div>
  );
};

export default HorizontalScroll2;
