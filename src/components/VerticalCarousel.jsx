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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
