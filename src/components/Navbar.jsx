import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logotrippc.png";
import logito from "../assets/logopostmovil.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import useProductos from "../hooks/useProductos"; // Hook que trae todos los productos activos
import "./navbar.css";

const adminEmail = "faculez07@gmail.com";

const Navbar = ({ busqueda, setBusqueda }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const { productos, loading } = useProductos();
  const [sugerencias, setSugerencias] = useState([]);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const navbarHeight = 110;
  const thresholdUp = 800;
  const thresholdDown = 200;

  const handleBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);

    if (query) {
      // Filtrar los productos activos según la búsqueda
      const productosFiltrados = productos.filter((producto) =>
        producto.nombre && producto.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSugerencias(productosFiltrados);
    } else {
      setSugerencias([]);
    }
  };

  const ejecutarBusqueda = () => {
    if (busqueda) {
      const productosFiltrados = productos.filter((producto) =>
        producto.nombre && producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setSugerencias(productosFiltrados);
    } else {
      setSugerencias([]);
    }
  };
  

  const cerrarSesion = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbarNav");
      const toggler = document.querySelector(".navbar-toggler");
      if (
        navbar &&
        navbar.classList.contains("show") &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !toggler.contains(event.target)
      ) {
        navbar.classList.remove("show");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedScrollUp = 0;
    let accumulatedScrollDown = 0;

    const isMobile = window.innerWidth <= 768;
    const mobileThresholdUp = 40;
    const desktopThresholdUp = thresholdUp;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const thresholdUpValue = isMobile ? mobileThresholdUp : desktopThresholdUp;

      if (currentScrollY > lastScrollY) {
        accumulatedScrollUp = 0;
        accumulatedScrollDown += currentScrollY - lastScrollY;
        if (accumulatedScrollDown >= thresholdDown) {
          setScrollingDown(true);
          setScrollingUp(false);
        }
      } else {
        accumulatedScrollDown = 0;
        accumulatedScrollUp += lastScrollY - currentScrollY;
        if (accumulatedScrollUp >= thresholdUpValue) {
          setScrollingUp(true);
          setScrollingDown(false);
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow ${
        scrollingDown ? "navbar-hidden" : ""
      } ${scrollingUp ? "navbar-visible" : ""}`}
      style={{ top: scrollingDown ? `-${navbarHeight}px` : "0px" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand d-none d-md-block" to="/">
          <img src={logo} alt="Trip Drugstore" height="60" />
        </Link>

        <Link className="navbar-brand d-md-none" to="/">
          <img src={logito} alt="Trip Drugstore" width="60" height="60" />
        </Link>

        <div className="position-relative flex-grow-1">
          <div className="input-group" style={{ width: "92%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="¿Qué estás buscando?"
              value={busqueda}
              onChange={handleBusqueda}
            />
            <button
              className="btn btn-outline-secondary border border-light"
              type="button"
              onClick={ejecutarBusqueda}
            >
              <FaSearch />
            </button>
          </div>

          {busqueda && (
            loading ? (
              <div
                className="position-absolute start-0 mt-1 shadow bg-light text-center py-2"
                style={{ width: "92%", zIndex: 10 }}
              >
                Cargando productos...
              </div>
            ) : sugerencias.length > 0 ? (
              <ul
                className="list-group position-absolute start-0 shadow bg-dark p-lg-2 border border-light"
                style={{ width: "92%", zIndex: 10 }}
              >
                {sugerencias.map((producto) => (
                  <li
                    key={producto.id}
                    className="list-group-item text-white p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setBusqueda("");
                      setSugerencias([]);
                      navigate(`/productos/${producto.categoria}/${producto.id}`);
                    }}
                  >
                    {producto.nombre} - ${producto.precio}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="position-absolute start-0 mt-0 shadow bg-dark text-center py-2 text-white border border-light rounded-2"
                style={{ width: "92%", zIndex: 10 }}
              >
                No se encontraron resultados.
              </div>

            )
          )}
        </div>



        <div className="d-flex d-lg-none align-items-center">
          <Link to="/carrito" className="text-white me-2">
            <FaShoppingCart size={24} />
          </Link>
          <button
            className="navbar-toggler border border-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="d-none d-lg-flex align-items-center order-lg-3 ms-md-2">
          <Link to="/carrito" className="text-white me-2">
            <FaShoppingCart size={24} />
          </Link>
        </div>

        <div className="collapse navbar-collapse ms-lg-2" id="navbarNav" ref={navbarRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle "
                to="/productos"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Categorías
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/productos/ofertas">Ofertas</Link></li>
                <li><Link className="dropdown-item" to="/productos/bebidas">Bebidas</Link></li>
                <li><Link className="dropdown-item" to="/productos/almacen">Almacén</Link></li>
                <li><Link className="dropdown-item" to="/productos/lacteos">Lácteos</Link></li>
                <li><Link className="dropdown-item" to="/productos/sandwiches">Sándwiches</Link></li>
                <li><Link className="dropdown-item" to="/productos/cafeteria">Cafetería</Link></li>
                <li><Link className="dropdown-item" to="/productos/infusiones">Infusiones</Link></li>
                <li><Link className="dropdown-item" to="/productos/limpieza">Limpieza</Link></li>
                <li><Link className="dropdown-item" to="/productos/otros">Otros</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contacto" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Mis Compras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ayuda" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Ayuda
              </Link>
            </li>

            {user && user.email === adminEmail && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }>
                  Admin
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={cerrarSesion}>
                    Cerrar sesión
                  </button>
                </li>
                <li className="nav-item align-items-center">
                  <Link className="nav-link d-flex align-items-center" to="/perfil" onClick={() =>
                    document.getElementById("navbarNav").classList.remove("show")
                  }>
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt="Avatar"
                      className="avatar-img me-2"
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                    {user.displayName || user.email}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
