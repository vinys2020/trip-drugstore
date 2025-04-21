import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logotrippc.png";
import logito from "../assets/logopostmovil.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { FaShoppingCart } from 'react-icons/fa';
import './navbar.css';

const productosData = [
  { id: 1, nombre: "Paracetamol", precio: 5, categoria: "Medicamentos" },
  { id: 2, nombre: "Ibuprofeno", precio: 8, categoria: "Medicamentos" },
  { id: 3, nombre: "Omeprazol", precio: 10, categoria: "Gastrointestinal" },
];

const adminEmail = "faculez07@gmail.com";

const Navbar = ({ busqueda, setBusqueda }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [sugerencias, setSugerencias] = useState([]);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const navbarHeight = 110;
  const thresholdUp = 800;
  const thresholdDown = 200;

  const navbarRef = useRef(null);  // Nueva referencia para el navbar

  const handleBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);

    if (query) {
      const productosFiltrados = productosData.filter((producto) =>
        producto.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSugerencias(productosFiltrados);
    } else {
      setSugerencias([]);
    }
  };

  // Función para cerrar el navbar si se hace clic fuera de él
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
  }, [scrollingDown, scrollingUp, thresholdUp, thresholdDown]);

  return (
    <nav
      className={`navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow${
        scrollingDown ? " navbar-hidden" : ""
      } ${scrollingUp ? " navbar-visible" : ""}`}
      style={{ top: scrollingDown ? `-${navbarHeight}px` : "0px" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand d-none d-md-block" to="/">
          <img src={logo} alt="Trip Drugstore" height="50" />
        </Link>

        <Link className="navbar-brand d-md-none" to="/">
          <img src={logito} alt="Trip Drugstore" width="50" height="55" />
        </Link>

        <div className="position-relative flex-grow-1">
          <input
            style={{ width: "92%" }}
            type="text"
            className="form-control"
            placeholder="Que estas buscando?"
            value={busqueda}
            onChange={handleBusqueda}
          />
          {sugerencias.length > 0 && (
            <ul
              className="list-group position-absolute start-0 mt-1 shadow"
              style={{ width: "92%", zIndex: 10 }}
            >
              {sugerencias.map((producto) => (
                <li
                  key={producto.id}
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setBusqueda(producto.nombre);
                    setSugerencias([]);
                    navigate("/productos");
                  }}
                >
                  {producto.nombre} - ${producto.precio}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="d-flex d-lg-none align-items-center">
          <div>
            <Link to="/carrito" className="text-white">
              <FaShoppingCart size={24} />
            </Link>
          </div>

          <button
            className="navbar-toggler"
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

        <div className="collapse navbar-collapse ms-2" id="navbarNav" ref={navbarRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/productos" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Mis Compras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/acerca" onClick={() =>
                document.getElementById("navbarNav").classList.remove("show")
              }>
                Ayuda
              </Link>
            </li>

            {/* Mostrar enlace Admin si el usuario es el administrador */}
            {user && user.email === adminEmail && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }>
                  Admin
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => auth.signOut()}>
                  Cerrar sesión
                </button>
              </li>
            )}

            {/* Usuario logueado o no */}
            {user ? (
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
