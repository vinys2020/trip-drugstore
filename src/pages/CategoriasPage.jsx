import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { CartContext } from "../context/CartContext";
import FiltrosResponsive from "../components/FiltrosResponsive";

import "./CategoriasPage.css";

export default function CategoriasPage() {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [filtroStock, setFiltroStock] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [filtroAlcohol, setFiltroAlcohol] = useState("todos");

  useEffect(() => {
    const fetchCategorias = async () => {
      const snapshot = await getDocs(collection(db, "Categoriasid"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre || doc.id,
      }));
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const toggleMostrarFiltros = () => setMostrarFiltros(!mostrarFiltros);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!categoriaId) {
        setProductos([]);
        return;
      }
      const productosRef = collection(db, "Categoriasid", categoriaId, "Productosid");
      const q = query(productosRef);
      const snapshot = await getDocs(q);
      const productosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
    };
    fetchProductos();
    setBusqueda("");
  }, [categoriaId]);

  const marcasDisponibles = Array.from(new Set(productos.map((p) => p.marca))).sort();

  let productosFiltrados = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.marca.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((producto) => {
      if (filtroStock === "disponible") return producto.stock > 0;
      if (filtroStock === "agotado") return producto.stock === 0;
      return true;
    })
    .filter((producto) => {
      if (precioMin && producto.precio < parseFloat(precioMin)) return false;
      if (precioMax && producto.precio > parseFloat(precioMax)) return false;
      return true;
    })
    .filter((producto) => {
      if (marcaSeleccionada && producto.marca !== marcaSeleccionada) return false;
      return true;
    })
    .filter((producto) => {
      if (filtroAlcohol === "con") return producto.categoria.toLowerCase().trim() !== "sin alcohol";
      if (filtroAlcohol === "sin") return producto.categoria.toLowerCase().trim() === "sin alcohol";
      return true;
    });

  if (ordenPrecio === "menor") {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (ordenPrecio === "mayor") {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  const handleCategoriaClick = (id) => {
    if (id !== categoriaId) {
      navigate(`/categorias/${id}`);
    }
  };

  const categoriaSeleccionada = categorias.find(cat => cat.id === categoriaId);

  return (
    <div className="categoriaspage-container">
      {/* Sidebar */}
      <FiltrosResponsive mostrar={mostrarFiltros} toggleMostrar={toggleMostrarFiltros}>
        <nav className="categoriaspage-sidebar mt-3" aria-label="Filtros y categorías">
          <h2 className="categoriaspage-sidebar-title mt-4">Categorías</h2>
          <ul className="categoriaspage-sidebar-list">
            {categorias.map((cat) => (
              <li
                key={cat.id}
                className={`categoriaspage-sidebar-item ${
                  cat.id === categoriaId ? "active" : ""
                }`}
                onClick={() => handleCategoriaClick(cat.id)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === "Enter" && handleCategoriaClick(cat.id)}
                aria-current={cat.id === categoriaId ? "true" : "false"}
              >
                {cat.nombre}
              </li>
            ))}
          </ul>

          <h2 className="categoriaspage-sidebar-title mt-4">Filtros</h2>

          <label className="form-label mt-2">Precio:</label>
          <div className="d-flex gap-2 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Mín"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Máx"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>

          <label className="form-label">Marca:</label>
          <select
            className="form-select mb-3"
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
          >
            <option value="">Todas</option>
            {marcasDisponibles.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>

          {categoriaSeleccionada?.nombre?.toLowerCase().trim() === "bebidas" && (
            <>
              <label className="form-label">Contenido de alcohol:</label>
              <select
                className="form-select mb-3"
                value={filtroAlcohol}
                onChange={(e) => setFiltroAlcohol(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="con">Con Alcohol</option>
                <option value="sin">Sin Alcohol</option>
              </select>
            </>
          )}

          <label className="form-label">Ordenar por:</label>
          <select
            className="form-select mb-4"
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="ninguno">Relevancia</option>
            <option value="menor">Precio: Menor a mayor</option>
            <option value="mayor">Precio: Mayor a menor</option>
          </select>
        </nav>
      </FiltrosResponsive>

      {/* Contenido principal */}
      <main className="categoriaspage-main mt-3" style={{ flex: "3" }}>
        <h1 className="categoriaspage-title">
          {categoriaSeleccionada ? categoriaSeleccionada.nombre : "Productos"}
        </h1>

        <div className="d-flex gap-2 flex-wrap mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto por nombre o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar producto"
            style={{ minWidth: "200px", flex: 1 }}
          />
          {/* Solo mostrar el botón "Filtrar" en pantallas chicas */}
          <button
            className="btn btn-outline-secondary d-flex align-items-center d-md-none"
            onClick={toggleMostrarFiltros}
          >
            <span>Filtrar</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="ms-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4H21M6 12H18M10 20H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
        </div>

        <div className="categoriaspage-productos row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <article
                key={producto.id}
                className="categoriaspage-product col-6 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card h-100 shadow-sm">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="categoriaspage-img card-img-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="categoriaspage-img-placeholder">Sin imagen</div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{producto.nombre}</h5>
                    <p className="text-muted mb-2">Marca: {producto.marca}</p>
                    <p className="mb-3">
                      Precio:{" "}
                      <span className="fw-bold">
                        ${producto.precio?.toFixed(2)}
                      </span>
                    </p>
                    <button
                      className="btn btn-warning-custom mt-auto"
                      disabled={producto.stock === 0}
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      {producto.stock === 0 ? "Agotado" : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </div>
      </main>
    </div>
  );
}
