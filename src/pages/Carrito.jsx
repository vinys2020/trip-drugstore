import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {
  const { cart } = useContext(CartContext);

  const enviarWhatsApp = () => {
    const mensaje = cart.map((p) => `• ${p.nombre} - $${p.precio}`).join("\n");
    const url = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="list-group">
          {cart.map((producto, index) => (
            <li key={index} className="list-group-item">
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button className="btn btn-success mt-3" onClick={enviarWhatsApp}>
          Enviar Pedido por WhatsApp
        </button>
      )}
    </div>
  );
};

export default Carrito;
