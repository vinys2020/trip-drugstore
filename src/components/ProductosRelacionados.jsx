import React, { useState, useRef, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Agregar esta línea

import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./HorizontalCarousel.css";

const ProductosRelacionados = ({ categoriaId, productoActualId }) => {
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const { agregarAlCarrito } = useContext(CartContext);
  const navigate = useNavigate(); // Inicializar hook


  useEffect(() => {
    const fetchRelacionados = async () => {
      try {
        const productosRef = collection(db, "Categoriasid", categoriaId, "Productosid");
        const q = query(productosRef, where("activo", "==", true));
        const snapshot = await getDocs(q);
        const productos = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.id !== productoActualId); // excluye el producto actual
        setProductosRelacionados(productos);
      } catch (error) {
        console.error("Error cargando productos relacionados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoriaId) fetchRelacionados();
  }, [categoriaId, productoActualId]);

  const irAlDetalle = (producto) => {
    navigate(`/categorias/${categoriaId}/producto/${producto.id}`);
  };


  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const scrollStep = clientWidth * 0.8; // o 1 para ver de a un "pantallazo"

      let targetScroll =
        direction === "next"
          ? Math.min(scrollLeft + scrollStep, maxScrollLeft)
          : Math.max(scrollLeft - scrollStep, 0);

      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  if (loading) return <p className="text-white">Cargando productos relacionados...</p>;

  if (!productosRelacionados.length) return null;

  return (
    <div
      className="position-relative mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-start mb-0">Productos Relacionados</h3>

      {isHovered && (
        <button
          className="andes-carousel-snapped__control position-absolute start-0 top-50 translate-middle-y z-3 prev-button"
          onClick={() => scroll("prev")}
          style={{ background: "transparent", border: "none" }}
          aria-label="Anterior"
        >
          {/* SVG de flecha izquierda */}
          <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32">
            <path d="M20.057 25L11.0617 16.0047L20.0664 7L19.0057 5.93933L8.94038 16.0047L18.9964 26.0607L20.057 25Z" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="scroll-producto-contenedor d-flex overflow-auto p-0 mt-2 mt-lg-3"
        style={{ gap: "12px", paddingBottom: "8px" }}
      >
        {productosRelacionados.map((producto, index) => (
          <div
            key={index}
            className="scroll-producto-card flex-shrink-0"
            onClick={() => irAlDetalle(producto)}
            style={{ cursor: "pointer" }} // Para mostrar que es clickeable
          >
            <img src={producto.imagen} alt={producto.nombre} className="scroll-producto-img" />
            <div className="scroll-producto-body">
              <div className="scroll-producto-precio-wrapper d-flex flex-column align-items-start">
                {/* Precio anterior */}
                <span style={{ textDecoration: "line-through", color: "#888", fontSize: "0.85rem" }} className="mt-lg-3">
                  ${producto.precio ? Math.round(producto.precio * 1.2).toLocaleString() : "-"}
                </span>

                {/* Precio actual */}
                <p className="scroll-producto-precio mb-0">
                  ${producto.precio ? producto.precio.toLocaleString() : "N/A"}
                </p>

              </div>
              <div className="dynamic-carousel__shipping-container mt-1 d-flex align-items-center gap-1 mb-1">
                <span>Trip</span>
                <i className="bi bi-lightning-fill text-warning"></i>
              </div>
              <h6 className="scroll-producto-titulo mb-0">{producto.nombre}</h6>
            </div>
            <button
              className="scroll-producto-boton mt-md-4 mt-2"
              onClick={(e) => {
                e.stopPropagation();
                console.log({ ...producto, categoriaId }); // debug
                agregarAlCarrito(producto, categoriaId);
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}

      </div>

      {isHovered && (
        <button
          className="andes-carousel-snapped__control position-absolute end-0 top-50 translate-middle-y z-3 next-button"
          onClick={() => scroll("next")}
          style={{ background: "transparent", border: "none" }}
          aria-label="Siguiente"
        >
          {/* SVG de flecha derecha */}
          <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32">
            <path d="M11.943 6.99999L20.9383 15.9953L11.9336 25L12.9943 26.0607L23.0596 15.9953L13.0036 5.93933L11.943 6.99999Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductosRelacionados;
