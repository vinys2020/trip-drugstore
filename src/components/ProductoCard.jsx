import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "./ProductoDetalle.css";

export default function ProductoDetalle() {
  const { categoriaId, productoId } = useParams();
  const [producto, setProducto] = useState(null);
  const [favorito, setFavorito] = useState(false);

  // Para zoom
  const imgRef = useRef(null);
  const zoomRef = useRef(null);
  const lensRef = useRef(null);

  const [zoomVisible, setZoomVisible] = useState(false);
  const [lensPos, setLensPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchProducto = async () => {
      const ref = doc(db, "Categoriasid", categoriaId, "Productosid", productoId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setProducto(docSnap.data());
      }
    };
    fetchProducto();
  }, [categoriaId, productoId]);

  const moveLens = (e) => {
    if (!imgRef.current || !lensRef.current || !zoomRef.current) return;

    e.preventDefault();

    const img = imgRef.current;
    const lens = lensRef.current;
    const zoom = zoomRef.current;

    const rect = img.getBoundingClientRect();

    // Calculate cursor position relative to image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Consider page scroll for mobile/tablet
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    // Prevent lens from moving outside image
    if (x < lens.offsetWidth / 2) x = lens.offsetWidth / 2;
    if (x > img.width - lens.offsetWidth / 2) x = img.width - lens.offsetWidth / 2;
    if (y < lens.offsetHeight / 2) y = lens.offsetHeight / 2;
    if (y > img.height - lens.offsetHeight / 2) y = img.height - lens.offsetHeight / 2;

    // Position lens
    setLensPos({ top: y - lens.offsetHeight / 2, left: x - lens.offsetWidth / 2 });

    // Calculate zoom background position
    const fx = zoom.offsetWidth / lens.offsetWidth;
    const fy = zoom.offsetHeight / lens.offsetHeight;

    const bgX = -((x * fx) - zoom.offsetWidth / 2);
    const bgY = -((y * fy) - zoom.offsetHeight / 2);

    zoom.style.backgroundPosition = `${bgX}px ${bgY}px`;
  };

  if (!producto)
    return <div className="loading text-center my-5">Cargando...</div>;

  return (
    <main className="producto-detalle-page container py-5">
      <article className="row justify-content-center g-4">
        {/* Imagen y zoom */}
        <section
          className="col-lg-6 col-md-8 col-sm-10 text-center producto-zoom-container"
          onMouseEnter={() => setZoomVisible(true)}
          onMouseLeave={() => setZoomVisible(false)}
          onMouseMove={moveLens}
        >
          <div className="producto-imagen-container" style={{ position: "relative" }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen img-fluid rounded shadow-sm"
              ref={imgRef}
            />
            {zoomVisible && (
              <div
                className="zoom-lens"
                ref={lensRef}
                style={{
                  top: lensPos.top,
                  left: lensPos.left,
                }}
              />
            )}
          </div>
          {zoomVisible && (
            <div
              className="zoom-result"
              ref={zoomRef}
              style={{
                backgroundImage: `url(${producto.imagen})`,
                backgroundSize: `${imgRef.current?.width * 3}px ${imgRef.current?.height * 3}px`,
              }}
            />
          )}
        </section>

        {/* Información del producto */}
        <section className="col-lg-5 col-md-8 col-sm-10 d-flex flex-column justify-content-between">
          <header className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="producto-titulo fw-bold">{producto.nombre}</h1>
            <button
              className="btn btn-link p-0 ms-2"
              onClick={() => setFavorito(!favorito)}
              aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="26"
                viewBox="0 0 22 20"
                fill={favorito ? "#FFCC00" : "none"}
                stroke="#FFCC00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ui-pdp-icon ui-pdp-icon--bookmark"
              >
                <path d="M11 18s-6-4.35-6-9a6 6 0 0 1 12 0c0 4.65-6 9-6 9z" />
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
            <button className="btn btn-warning btn-lg w-100 mt-4 shadow-sm">
              Agregar al carrito
            </button>
          </footer>
        </section>



      </article>
    </main>
  );
}
