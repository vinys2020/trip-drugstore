import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Ayuda from "./pages/Ayuda";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <CartProvider>
      <Router>
        <Navbar setBusqueda={setBusqueda} />

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

        <Footer />
      </Router>
    </CartProvider>
    
  );
};

export default App;
