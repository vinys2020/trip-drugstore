import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { CartContext } from "../context/CartContext";
import ProductosRelacionados from "../components/ProductosRelacionados";

import "./ProductoDetalle.css";

export default function ProductoDetalle() {
  const { categoriaId, productoId } = useParams();
  const [producto, setProducto] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const { agregarAlCarrito } = useContext(CartContext);


  // Estado para controlar el zoom y posición del lens
  const [zoomVisible, setZoomVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const imgRef = useRef(null);
  

  useEffect(() => {
    const fetchProducto = async () => {
      const ref = doc(db, "Categoriasid", categoriaId, "Productosid", productoId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setProducto({ id: docSnap.id, ...docSnap.data() });
    }
    };
    fetchProducto();
  }, [categoriaId, productoId]);

  const lensSize = 120; // tamaño del recuadro lens

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left - lensSize / 2;
    let y = e.clientY - rect.top - lensSize / 2;

    // Limitar que el lens no se salga de la imagen
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - lensSize) x = rect.width - lensSize;
    if (y > rect.height - lensSize) y = rect.height - lensSize;

    setLensPosition({ x, y });

    // Calcular posición de fondo para el zoom
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };

  if (!producto) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="producto-detalle-loader"></div>
      </div>
    );
  }
  

  return (
    <main className="producto-detalle-page container-fluid py-5">
      <article className="row justify-content-center g-2 mt-lg-4">
        {/* Imagen del producto con zoom */}
        <section className="col-lg-6 col-md-8 col-sm-10 text-center producto-zoom-container">
          <div
            className="producto-imagen-container"
            onMouseEnter={() => setZoomVisible(true)}
            onMouseLeave={() => setZoomVisible(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen img-fluid rounded shadow-sm"
              ref={imgRef}
            />
            {zoomVisible && (
              <div
                className="zoom-lens"
                style={{
                  left: lensPosition.x,
                  top: lensPosition.y,
                  width: lensSize,
                  height: lensSize,
                }}
              />
            )}
          </div>

          {zoomVisible && (
            <div
              className="zoom-result"
              style={{
                backgroundImage: `url(${producto.imagen})`,
                backgroundPosition: backgroundPosition,
                backgroundSize: `${imgRef.current?.width * 2}px ${
                  imgRef.current?.height * 2
                }px`,
              }}
            />
          )}
        </section>

        {/* Información del producto */}
        <section className="col-lg-5 col-md-8 col-sm-10 d-flex flex-column mt-3">
          <header className="d-flex justify-content-between align-items-start mb-3 mb-lg-0 mt-lg-3">
            <h1 className="producto-titulo fw-bold mb-lg-3 mt-lg-5">{producto.nombre}</h1>
            <button
  className="btn btn-link p-0 ms-2 mt-1 mt-lg-2"
  onClick={() => setFavorito(!favorito)}
  aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
  title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="26"
    viewBox="0 0 24 24"
    fill={favorito ? "#FFCC00" : "none"}
    stroke="#FFCC00"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ui-pdp-icon ui-pdp-icon--bookmark"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
</button>

          </header>

          <section>
            <h2 className="producto-precio text-success fw-bold mb-3">
              ${producto.precio}
            </h2>

            <p className="mb-2">
              <strong>Marca:</strong> {producto.marca}
            </p>
            <p className="mb-3">
              <strong>Stock disponible:</strong>{" "}
              {producto.stock > 0 ? producto.stock : "Agotado"}
            </p>

            <div className="mb-4 info-adicional">
              <p className="text-success mb-1 fw-semibold">
                Envío gratis <i className="bi bi-truck"></i>
              </p>
              <p className="text-primary mb-0 fw-semibold">
                Devolución gratis <i className="bi bi-arrow-counterclockwise"></i>
              </p>
            </div>

            {producto.descripcion && (
              <p className="producto-descripcion border-top pt-3">{producto.descripcion}</p>
            )}
          </section>

          <footer>
          <button
  className="btn btn-warning btn-lg w-100 mt-4 shadow-sm"
  onClick={() => agregarAlCarrito(producto, categoriaId)}
>
  Agregar al carrito
</button>
          </footer>
        </section>

        <section className="container mt-5">
  <article className="row justify-content-center">
    <div className="col-12">
    </div>
    <div className="col-lg-10 col-md-11 col-sm-12">
      <ProductosRelacionados
        categoriaId={categoriaId} // Podés reemplazarlo dinámicamente si lo tenés
        productoActualId={producto.id}
      />
    </div>
  </article>
</section>
      </article>
    </main>
  );
}
