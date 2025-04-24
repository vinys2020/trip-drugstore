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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css"; // Asegurate de tener este import para que cargue los estilos

// Componente que maneja Navbar y Footer según la ruta
const AppContent = () => {
  const [busqueda, setBusqueda] = useState("");
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar setBusqueda={setBusqueda} />}

      <div className="w-100 p-0">
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
        <div className="app-root-wrapper">
          <AppContent />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
