import React, { useState, useRef } from "react";
import "./HorizontalCarousel.css";

const productos = [
  {
    nombre: "Huevo Kinder Gran Sorpresa Rosa 150g",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_893501-MLU78003887134_082024-P.webp",
    precioAnterior: 25000,
    precioActual: 18500,
    descuento: "26% OFF",
    descripcion: "Un huevo de chocolate con sorpresa de regalo.",
    link: "https://www.mercadolibre.com.ar/huevo-kinder-gran-sorpresa-rosa-150g/p/MLA20018967",
  },
  {
    nombre: "Chocolate Mini Conejos Bonafide X 140g",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_621667-MLA83502158303_042025-P.webp",
    precioAnterior: 5800,
    precioActual: 4600,
    descuento: "21% OFF",
    descripcion: "Conejitos de chocolate ideales para Pascuas o regalar.",
    link: "#",
  },
  {
    nombre: "Jägermeister 700ml - Licor De Hierbas",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_623875-MLU74543092615_022024-P.webp",
    precioAnterior: 26000,
    precioActual: 22900,
    descuento: "12% OFF",
    descripcion: "Licor de hierbas alemán ideal para shots fríos.",
    link: "#",
  },
  {
    nombre: "Gillette Proshield Repuestos 4 unidades",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_983565-MLU78766127637_082024-P.webp",
    precioAnterior: 16800,
    precioActual: 14300,
    descuento: "15% OFF",
    descripcion: "Repuestos para afeitar Gillette Proshield x4.",
    link: "#",
  },
  {
    nombre: "Alfajor Rasta Chocolate Negro Caja X 18Un",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_855039-MLA82920173813_032025-P.webp",
    precioAnterior: 9600,
    precioActual: 7900,
    descuento: "17% OFF",
    descripcion: "Caja con 18 alfajores Rasta de chocolate negro.",
    link: "#",
  },
  {
    nombre: "Cerveza Miller Genuine Draft Lata 473ml Pack X24",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_979024-MLU72732453523_112023-P.webp",
    precioAnterior: 45000,
    precioActual: 38500,
    descuento: "14% OFF",
    descripcion: "Pack de 24 latas de cerveza Miller de 473ml.",
    link: "#",
  },
  {
    nombre: "Detergente Magistral Ultra Limón Botella 1400 Ml",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_771902-MLA81774714817_012025-P.webp",
    precioAnterior: 7200,
    precioActual: 6300,
    descuento: "13% OFF",
    descripcion: "Detergente concentrado con aroma a limón.",
    link: "#",
  },
  {
    nombre: "Michelob Ultra Rubia 6 unidades 473ml",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_703807-MLA79481347418_102024-P.webp",
    precioAnterior: 9000,
    precioActual: 7650,
    descuento: "15% OFF",
    descripcion: "Cerveza lager sin gluten, pack de 6 latas de 473ml.",
    link: "#",
  }
];

const HorizontalCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const scrollStep = clientWidth * 2.9; // Más rápido pero no violento
  
      let targetScroll = direction === "next"
        ? Math.min(scrollLeft + scrollStep, maxScrollLeft)
        : Math.max(scrollLeft - scrollStep, 0);
  
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };
  

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón Prev */}
      {isHovered && (
        <button
          className="andes-carousel-snapped__control andes-carousel-snapped__control--size-large position-absolute start-0 top-50 translate-middle-y z-3 prev-button"
          onClick={() => scroll("prev")}
          style={{ background: "transparent", border: "none" }}
          aria-label="Anterior"
        >
          <svg
            aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="rgba(0, 0, 0, 0.9)"
          >
            <path d="M20.057 25L11.0617 16.0047L20.0664 7L19.0057 5.93933L8.94038 16.0047L18.9964 26.0607L20.057 25Z" />
          </svg>
        </button>
      )}

      {/* Carrusel */}
      <div
        ref={scrollRef}
        className="scroll-producto-contenedor d-flex overflow-auto"
        style={{
          scrollSnapType: "x mandatory",
          gap: "12px",
          paddingBottom: "8px",
        }}
      >
        {productos.map((producto, index) => (
          <div
            key={index}
            className="scroll-producto-card flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <a
              href={producto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="scroll-producto-img"
              />
              <div className="scroll-producto-body">
                <div className="scroll-producto-precio-wrapper">
                  <p className="scroll-producto-precio-anterior">
                    ${producto.precioAnterior.toLocaleString()}
                  </p>
                  <p className="scroll-producto-precio">
                    ${producto.precioActual.toLocaleString()}
                    <span className="scroll-producto-descuento">
                      {producto.descuento}
                    </span>
                  </p>
                  <div className="dynamic-carousel__shipping-container mt-1">
                    <span>Envío gratis </span>
                    {/* SVG de Envío */}
                  </div>
                </div>
                <h6 className="scroll-producto-titulo mb-0">{producto.nombre}</h6>
              </div>
            </a>
            <button className="scroll-producto-boton mt-md-4 mt-0">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Botón Next */}
      {isHovered && (
        <button
          className="andes-carousel-snapped__control andes-carousel-snapped__control--size-large position-absolute end-0 top-50 translate-middle-y z-3 next-button"
          onClick={() => scroll("next")}
          style={{ background: "transparent", border: "none" }}
          aria-label="Siguiente"
        >
          <svg
            aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="rgba(0, 0, 0, 0.9)"
          >
            <path d="M11.943 6.99999L20.9383 15.9953L11.9336 25L12.9943 26.0607L23.0596 15.9953L13.0036 5.93933L11.943 6.99999Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default HorizontalCarousel;
