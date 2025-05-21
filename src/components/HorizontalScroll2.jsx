import React from "react";
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
    link: "#",
    title: "CAFÉ"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_646735-MLA81364443724_122024-G.webp",
    alt: "LIMPIEZA",
    link: "#",
    title: "LIMPIEZA"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_799360-MLA82317787351_022025-G.webp",
    alt: "SALUDABLES",
    link: "#",
    title: "SALUDABLES"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_833202-MLA81364584956_122024-G.webp",
    alt: "LACTEOS",
    link: "#",
    title: "LACTEOS"
  },
  {
    image: "https://http2.mlstatic.com/D_Q_NP_2X_846703-MLA81564985462_012025-G.webp",
    alt: "MASCOTAS",
    link: "#",
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
          target=""
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
