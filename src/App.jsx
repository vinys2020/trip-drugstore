import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Ayuda from "./pages/Ayuda";

import logo from "./assets/logotrippc.png";
import logito from "./assets/logopostmovil.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Componente que maneja Navbar y Footer según la ruta
const AppContent = () => {
  const [busqueda, setBusqueda] = useState("");
  const location = useLocation();

  const soloLogoNavbar = (
    <div className="nav-bounds  sticky-top bg-dark d-flex justify-content-start p-2"   style={{ zIndex: 2, position: 'relative' }}
    >
      <Link className="navbar-brand d-none d-md-block p-1" to="/" style={{ marginLeft: 100, marginTop: 10 }}>
        <img src={logo} alt="Trip Drugstore" height="60"/>
      </Link>
      <Link className="navbar-brand d-md-none " to="/" style={{ marginLeft: 95, marginTop: 5 }}>
        <img src={logo} alt="Trip Drugstore" width="200" height="60" />
      </Link>
    </div>
  );

  return (
    <>
      {location.pathname === "/login"
        ? soloLogoNavbar
        : <Navbar setBusqueda={setBusqueda} />}

      <div className="container w-100 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos busqueda={busqueda} />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/ayuda" element={<Ayuda />} />
        </Routes>
      </div>

      {location.pathname !== "/login" && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;
