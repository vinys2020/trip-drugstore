import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import "./FloatingCart.css";

const FloatingCart = () => {
  const { 
    cart, 
    eliminarDelCarrito, 
    disminuirCantidad, 
    totalItems, 
    totalPrecio, 
    aplicarCupon, 
    coupon, 
    setCoupon, 
    discount,
    telefonoUsuario,
    setTelefonoUsuario, 
    agregarAlCarrito 
  } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Icono del carrito flotante */}
      <div className="floating-cart-icon" onClick={() => setIsOpen(true)}>
        <FaShoppingCart size={24} />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>

      {/* Modal del carrito */}
      {isOpen && (
        <div className="cart-modal">
          <div className="cart-modal-header">
            <h5>Tu Carrito</h5>
            <button className="close-btn p-1" onClick={() => setIsOpen(false)}>
              <FaTimes size={23} />
            </button>
          </div>

          <div className="cart-modal-body">
            {/* Verifica si el carrito está vacío */}
            {cart.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              cart.map((producto, i) => (
                <div key={i} className="cart-item">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="cart-item-details">
                    <h6>{producto.nombre}</h6>
                    <p>
                      ${producto.precio} x {producto.cantidad} = ${producto.precio * producto.cantidad}
                    </p>

                    {/* Controles para la cantidad */}
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => disminuirCantidad(producto.id)}
                        disabled={producto.cantidad <= 1}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span>{producto.cantidad}</span>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>

                    {/* Botón de eliminar */}
                    <button
                      className="remove-item"
                      onClick={() => eliminarDelCarrito(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}

            <div className="telefono-container">
              <input
                type="tel"
                placeholder="Tu número de teléfono"
                value={telefonoUsuario}
                onChange={(e) => setTelefonoUsuario(e.target.value)}
                className="telefono-input"
              />
            </div>

            {/* Sección del cupón */}
            <div className="coupon-container">
              <input
                type="text"
                placeholder="Código de cupón"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="coupon-input"
              />
              <button onClick={() => aplicarCupon(coupon)} className="apply-coupon-btn">
                Aplicar cupón
              </button>
              {discount > 0 && <p className="discount-text">Descuento aplicado: {discount}%</p>}
            </div>



            {/* Total y botón para pagar */}
            <div className="floating-cart-total">
              <p>Total: ${totalPrecio.toFixed(2)}</p>
              <button className="view-cart-btn">Ir a Pagar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;
