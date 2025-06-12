import React, { useState, useEffect } from "react"; // ← asegurate de importar useEffect
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmpleadoDashboard from "./pages/EmpleadoDashboard";

import Ayuda from "./pages/Ayuda";
import Perfil from "./pages/Perfil";
import InstallModal from "./components/InstallModal";
import CategoriasPage from "./pages/CategoriasPage";
import FloatingCart from "./components/FloatingCart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProductoDetalle from "./components/ProductoDetalle";

import ScrollToTop from "./components/ScrollToTop"; // ajustá el path según corresponda
import "./App.css"; // Asegúrate de tener este import para que cargue los estilos

// Asegúrate de que la ruta del AuthContext sea correcta
import { AuthProvider } from "./context/AuthContext"; // Ajusta esta ruta según tu estructura

// Componente que maneja Navbar y Footer según la ruta
const AppContent = () => {
  const [busqueda, setBusqueda] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      document.body.classList.add("login-page");
    } else {
      document.body.classList.remove("login-page");
    }
  }, [location]);

  return (
    <>
      {location.pathname !== "/login" && <Navbar busqueda={busqueda} setBusqueda={setBusqueda} />}

      <div className="w-100 p-0">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos busqueda={busqueda} />} />
          <Route path="/categorias/:categoriaId" element={<CategoriasPage />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/empleado" element={<EmpleadoDashboard />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/categorias/:categoriaId/producto/:productoId"
            element={<ProductoDetalle />}
          />

        </Routes>
        <FloatingCart />

      </div>
      <InstallModal />


      {location.pathname !== "/login" && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop /> {/* ← colocá esto aquí, fuera de <Routes> */}


          <div className="app-root-wrapper">
            <AppContent />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
