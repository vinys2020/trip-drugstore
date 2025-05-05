import React from "react";
import "./VerticalCarousel.css";

const productos = [
  {
    nombre: "Huevo Kinder Gran Sorpresa Rosa 150g",
    precio: "10,200",
    precioAnterior: "199.99",
    descuento: "20% OFF",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_893501-MLU78003887134_082024-P.webp",
  },
  {
    nombre: "Huevo Kinder Gran Sorpresa Rosa 150g",
    precio: "10,200",
    precioAnterior: "199.99",
    descuento: "20% OFF",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_893501-MLU78003887134_082024-P.webp",
  },
  {
    nombre: "Huevo Kinder Gran Sorpresa Rosa 150g",
    precio: "10,200",
    precioAnterior: "199.99",
    descuento: "20% OFF",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_893501-MLU78003887134_082024-P.webp",
  },
  {
    nombre: "Huevo Kinder Gran Sorpresa Rosa 150g",
    precio: "10,200",
    precioAnterior: "199.99",
    descuento: "20% OFF",
    imagen: "https://http2.mlstatic.com/D_Q_NP_2X_893501-MLU78003887134_082024-P.webp",
  }
];

const VerticalCarousel = () => {
  return (
    <div className="container">
      {/* Título */}
      <div
        className="container"
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "10px",
        }}
      >
        <h3
          className="text-start text-black mb-0"
          style={{
            color: "#3483fa",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Trip Café ☕
        </h3>
      </div>

      {/* Carrusel de productos */}
      <div className="vc-carousel-wrapper">
        <div className="vc-carousel-container">
          {productos.map((producto, index) => (
            <div className="vc-product-card p-lg-0" key={index}>
              <div className="vc-product-img-wrapper">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="vc-product-img"
                />
              </div>
              <div className="vc-product-body">
                <div className="vc-product-title-wrapper">
                  <h2 className="vc-product-title">{producto.nombre}</h2>
                </div>
                <div className="vc-precio-wrapper">
                  <p className="vc-precio-anterior">${producto.precioAnterior}</p>
                  <div className="vc-price-current">
                    <p className="vc-precio-actual">${producto.precio}</p>
                    <span className="vc-descuento">{producto.descuento}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ver más */}
      <div
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "10px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <a
          className="splinter-link dynamic__carousel-link fw-bold text-decoration-none fs-5"
          href="https://listado.mercadolibre.com.ar/supermercado/_Container_carrousel-14-04-25#DEAL_ID=MLA1226392-1&S=landingHubsupermercadolibre&V=13&T=CarouselDynamic-home&L=VER-MAS&deal_print_id=55673f90-1a49-11f0-8170-23d8a207be82&c_tracking_id=55673f90-1a49-11f0-8170-23d8a207be82"
          target="_self"
          style={{
            color: "#3483fa",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Ver más <span style={{ fontSize: "1.0rem" }}>{'>'}</span>
        </a>
      </div>
    </div>
  );
};

export default VerticalCarousel;
