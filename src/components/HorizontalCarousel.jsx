// components/HorizontalCarousel.jsx
import React from "react";
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
  return (
    <div
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
          style={{
            scrollSnapAlign: "start",
          }}
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

                <div className="dynamic-carousel__shipping-container">
                  <span>Envío gratis </span>
                  <svg
                    viewBox="0 0 56 18"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dynamic-carousel__shipping-container-fulfillment"
                    width="38px"
                    height="12px"
                  >
                    <path
                      d="M3.545 0L0 10.286h5.91L3.544 18 13 6.429H7.09L10.637 0zm14.747 14H15.54l2.352-10.672h7.824l-.528 2.4h-5.072l-.352 1.664h4.944l-.528 2.4h-4.96L18.292 14zm13.32.192c-3.28 0-4.896-1.568-4.896-3.808 0-.176.048-.544.08-.704l1.408-6.352h2.8l-1.392 6.288c-.016.08-.048.256-.048.448.016.88.688 1.728 2.048 1.728 1.472 0 2.224-.928 2.496-2.176L35.5 3.328h2.784l-1.392 6.336c-.576 2.592-1.984 4.528-5.28 4.528zM45.844 14h-7.04l2.352-10.672h2.752L42.1 11.6h4.272l-.528 2.4zm9.4 0h-7.04l2.352-10.672h2.752L51.5 11.6h4.272l-.528 2.4z"
                      fill="#00a650"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <h6 className="scroll-producto-titulo mb-0">{producto.nombre}</h6>
            </div>
          </a>
          <button className="scroll-producto-boton mt-md-2 mt-0">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCarousel;
