import React, { useState, useRef, useContext } from "react";
import useots from "../hooks/useProductosots";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./HorizontalCarousel.css";

const HorizontalCarousel = () => {
    const [isHovered, setIsHovered] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();


    const { productos, loading } = useots();
    const { agregarAlCarrito } = useContext(CartContext);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;
            const scrollStep = clientWidth * 0.8; // o 1 para ver de a un "pantallazo"

            let targetScroll = direction === "next"
                ? Math.min(scrollLeft + scrollStep, maxScrollLeft)
                : Math.max(scrollLeft - scrollStep, 0);

            scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
        }
    };

    const handleProductoClick = (producto) => {
        navigate(`/categorias/Otrosid/producto/${producto.id}`, { state: { producto } });
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
        <div
            className="position-relative mt-lg-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Título y enlace "Ver más" */}
            <h3 className="text-start text-white mb-0">
                <span>Tambien tenemos </span>
                <a
                    className="splinter-link dynamic__carousel-link fw-bold text-decoration-none fs-5 ms-2"
                    href="/categorias/Otrosid"
                    target="_self"
                    style={{ color: "#3483fa" }}
                >
                    Ver más
                </a>
            </h3>

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
                        style={{ scrollSnapAlign: "start", cursor: "pointer" }}
                        onClick={() => handleProductoClick(producto)}
                    >
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="scroll-producto-img"
                        />
                        <div className="scroll-producto-body">
                            <div className="scroll-producto-precio-wrapper">
                                <p className="scroll-producto-precio">
                                    ${producto.precio ? producto.precio.toLocaleString() : "N/A"}
                                    <span className="scroll-producto-descuento">
                                        {producto.descuento || "Sin descuento"}
                                    </span>
                                </p>
                                <div className="dynamic-carousel__shipping-container mt-1">
                                    <span>Envío gratis</span>
                                </div>
                            </div>
                            <h6 className="scroll-producto-titulo mb-0">{producto.nombre}</h6>
                        </div>
                        <button
                            className="scroll-producto-boton mt-md-4 mt-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                agregarAlCarrito(producto, "Otrosid"); // PASO LA CATEGORÍA EXPLÍCITA
                            }}
                        >
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
