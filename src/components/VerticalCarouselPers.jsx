import React, { useContext } from "react";
import useProductosPers from "../hooks/useProductosPers";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // ✅ Importar el contexto
import "./VerticalCarousel.css";

const VerticalCarousel = () => {
  const navigate = useNavigate();
  const { productos, loading } = useProductosPers();
  const { agregarAlCarrito } = useContext(CartContext); // ✅ Usar el contexto

  const handleProductoClick = (producto) => {
    if (!producto.id) {
      console.warn("El producto no tiene id");
      return;
    }

    // Si no tiene categoriaId, le asigno el valor por defecto
    const categoriaId = producto.categoriaId || "Cuidadopersonalid";

    navigate(`/categorias/${categoriaId}/producto/${producto.id}`, {
      state: { producto },
    });
  };


  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="custom-loader-spin"></div>
      </div>
    );
  }

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
          Cuidado Personal
        </h3>
      </div>

      {/* Carrusel de productos */}
      <div className="vc-carousel-wrapper">
        <div className="vc-carousel-container">
          {productos.slice(0, 4).map((producto, index) => (
            <div
              className="vc-product-card p-lg-0"
              key={producto.id || index}
              style={{ cursor: "pointer" }}
              onClick={() => handleProductoClick(producto)}
            >
              <div className="vc-product-img-wrapper">
                <img
                  src={producto.imagen || "/placeholder.jpg"}
                  alt={producto.nombre}
                  className="vc-product-img"
                />
              </div>
              <div className="vc-product-body">
                <div className="vc-product-title-wrapper">
                  <h2 className="vc-product-title">{producto.nombre}</h2>
                </div>
                <div className="vc-precio-wrapper">
                  <p className="vc-precio-anterior">
                    ${producto.precioAnterior || "-"}
                  </p>
                  <div className="vc-price-current">
                    <p className="vc-precio-actual">${producto.precio}</p>
                    {producto.descuento && (
                      <span className="vc-descuento">
                        {producto.descuento}
                      </span>
                    )}
                  </div>
                </div>

                {/* ✅ Botón Agregar al carrito */}
                <button
                  className="scroll-producto-boton mt-md-4 mt-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(producto, "Cuidadopersonalid"); // PASO LA CATEGORÍA EXPLÍCITA
                  }}
                >
                  Agregar al carrito
                </button>
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
          href="/categorias/Cuidadopersonalid"
          target="_self"
          style={{
            color: "#3483fa",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          Ver más <span style={{ fontSize: "1.0rem" }}>{">"}</span>
        </a>
      </div>
    </div>
  );
};

export default VerticalCarousel;
