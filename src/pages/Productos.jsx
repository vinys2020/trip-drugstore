import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductoCard from "../components/ProductoCard";

const productosData = [
  { id: 1, nombre: "Paracetamol", precio: 5, categoria: "Medicamentos" },
  { id: 2, nombre: "Ibuprofeno", precio: 8, categoria: "Medicamentos" },
  { id: 3, nombre: "Omeprazol", precio: 10, categoria: "Gastrointestinal" },
];

const Productos = () => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productosData.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Productos</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar producto..."
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="row">
        {productosFiltrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} onAdd={agregarAlCarrito} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
