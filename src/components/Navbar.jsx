import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logotrippc.png"; // Ajusta la ruta según tu estructura de carpetas
import logito from "../assets/logopostmovil.png"; // Ajusta la ruta según tu estructura de carpetas
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono del carrito
import './navbar.css';

const productosData = [
  { id: 1, nombre: "Paracetamol", precio: 5, categoria: "Medicamentos" },
  { id: 2, nombre: "Ibuprofeno", precio: 8, categoria: "Medicamentos" },
  { id: 3, nombre: "Omeprazol", precio: 10, categoria: "Gastrointestinal" },
];

const Navbar = () => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  const navbarHeight = 110; // Ajusta este valor según la altura de tu navbar
  const thresholdUp = 800; // Píxeles necesarios para mostrar la navbar al subir
  const thresholdDown = 200; // Píxeles necesarios para ocultar la navbar al bajar

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedScrollUp = 0;
    let accumulatedScrollDown = 0;
  
    const isMobile = window.innerWidth <= 768;
    const mobileThresholdUp = 40; // más sensible en móviles
    const desktopThresholdUp = thresholdUp;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const thresholdUpValue = isMobile ? mobileThresholdUp : desktopThresholdUp;
  
      if (currentScrollY > lastScrollY) {
        // Desplazamiento hacia abajo
        accumulatedScrollUp = 0;
        accumulatedScrollDown += currentScrollY - lastScrollY;
  
        if (accumulatedScrollDown >= thresholdDown) {
          setScrollingDown(true);
          setScrollingUp(false); // Oculta si baja
        }
      } else {
        // Desplazamiento hacia arriba
        accumulatedScrollDown = 0;
        accumulatedScrollUp += lastScrollY - currentScrollY;
  
        if (accumulatedScrollUp >= thresholdUpValue) {
          setScrollingUp(true);
          setScrollingDown(false); // Muestra si sube
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
        scrollingDown ? "navbar-hidden" : ""
      } ${scrollingUp ? "navbar-visible" : ""}`}
      style={{ top: scrollingDown ? `-${navbarHeight}px` : "0px" }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="navbar-brand d-none d-md-block" to="/">
          <img src={logo} alt="Trip Drugstore" height="50" />
        </Link>

        {/* Logo y título */}
        <Link className="navbar-brand d-md-none" to="/">
          <img src={logito} alt="Trip Drugstore" width="50" height="55" />
        </Link>

        {/* Contenedor de búsqueda con position-relative */}
        <div className="position-relative flex-grow-1">
          <input
            style={{ width: "92%" }}
            type="text"
            className="form-control"
            placeholder="Que estas buscando?"
            value={busqueda}
            onChange={handleBusqueda}
          />
          {/* Mostrar sugerencias bien alineadas */}
          {sugerencias.length > 0 && (
            <ul
              className="list-group position-absolute start-0 mt-1 shadow"
              style={{ width: "92%" }}
            >
              {sugerencias.map((producto) => (
                <li
                  key={producto.id}
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setBusqueda(producto.nombre)}
                >
                  {producto.nombre} - ${producto.precio}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contenedor del carrito y el menú responsive SOLO en móviles */}
        <div className="d-flex d-lg-none align-items-center">
          {/* Ícono de carrito (en móviles se alinea bien con flex-column) */}
          <div className="">
            <Link to="/carrito" className="text-white">
              <FaShoppingCart size={24} />
            </Link>
          </div>

          {/* Botón del menú responsive */}
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

        {/* Ícono de carrito en pantallas grandes */}
        <div className="d-none d-lg-flex align-items-center order-lg-3 ms-md-2">
          <Link to="/carrito" className="text-white me-2">
            <FaShoppingCart size={24} />
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse ms-2" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/ofertas"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contacto"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Mis Compras
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/acerca"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Mi Cuenta
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/acerca"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Creá tu cuenta
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/acerca"
                onClick={() =>
                  document.getElementById("navbarNav").classList.remove("show")
                }
              >
                Ayuda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
