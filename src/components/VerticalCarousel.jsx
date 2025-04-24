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
  // Puedes duplicar más productos si querés.
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
    <div className="vc-carousel-wrapper">
      <div className="vc-carousel-container">
        {productos.map((producto, index) => (
          <div className="vc-product-card" key={index}>
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
  );
};

export default VerticalCarousel;
