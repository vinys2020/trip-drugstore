import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Archivo de estilos

const images = [
  {
    src: "https://http2.mlstatic.com/D_Q_NP_2X_695687-MLA81364471168_122024-G.webp",
    title: "SUPER OFERTAS",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Discount_20-100"
  },
  {
    src: "https://http2.mlstatic.com/D_Q_NP_2X_702985-MLA81633888259_122024-G.webp",
    title: "CAPSULAS",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_black-friday-capsulas"
  },
  {
    src: "https://http2.mlstatic.com/D_Q_NP_2X_646735-MLA81364443724_122024-G.webp",
    title: "DESECHABLES",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_desechables"
  },
  {
    src: "https://http2.mlstatic.com/D_Q_NP_2X_799360-MLA82317787351_022025-G.webp",
    title: "CONSUMO CONSCIENTE",
    link: "https://listado.mercadolibre.com.ar/supermercado/_Container_mk-saludables25-cpg"
  }
];

const Carousel = () => {
  const sliderRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const enableScroll = () => setIsActive(true);
  const disableScroll = () => setIsActive(false);

  return (
    <div
      className={`carousel-container ${isActive ? "scroll-enabled" : ""}`}
      ref={sliderRef}
      onMouseEnter={enableScroll}  // Activar en hover (PC)
      onMouseLeave={disableScroll} // Desactivar cuando sale (PC)
      onTouchStart={enableScroll}  // Activar cuando toca (móvil)
      onTouchEnd={disableScroll}   // Desactivar cuando suelta (móvil)
    >
      <Slider
        dots={false}
        infinite={false} // Desactiva el movimiento infinito
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay={false} // Desactiva el autoplay
        arrows={false} // Oculta flechas
        swipeToSlide={true} // Permite deslizar con el dedo/mouse
        touchMove={true} // Habilita el movimiento táctil
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]}
      >
        {images.map((item, index) => (
          <div key={index} className="carousel-item">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.src} alt={item.title} />
              <p>{item.title}</p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
