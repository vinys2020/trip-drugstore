import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { db, auth } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
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
    agregarAlCarrito,
    vaciarCarrito,
  } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [metodoPago, setMetodoPago] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsuario({
        nombre: user.displayName || "Sin nombre",
        email: user.email,
        telefono: telefonoUsuario,
      });
    }
  }, [telefonoUsuario]);

  const registrarPedido = async () => {
    if (!usuario) {
      alert("Por favor, inicia sesión para realizar un pedido.");
      return;
    }

    try {
      setIsLoading(true);

      const pedidoData = {
        cliente: {
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: "Calle Ficticia 123",
          entrega: "takeaway",
        },
        estado: "pendiente",
        fecha: Timestamp.now(),
        metodopago: metodoPago,
        productos: cart.map((producto) => ({
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          preciounitario: producto.precio,
          total: producto.precio * producto.cantidad,
        })),
        totalpedido: totalPrecio,
      };

      const docRef = await addDoc(collection(db, "Pedidosid"), pedidoData);

      console.log("Pedido registrado con ID: ", docRef.id);
      alert("Pedido realizado exitosamente!");

      // Vaciar el carrito
      vaciarCarrito();

      setIsOpen(false);
      setStep(1);
      setMetodoPago("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al registrar el pedido: ", error);
      alert("Hubo un problema al procesar tu pedido. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  const handleTelefonoChange = (e) => {
    setTelefonoUsuario(e.target.value);
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  const handleConfirmarTelefono = () => {
    if (!telefonoUsuario) {
      alert("El número de teléfono es obligatorio.");
    } else {
      setStep(2);
    }
  };

  const handleConfirmarPago = () => {
    if (!metodoPago) {
      alert("Debes seleccionar un método de pago.");
    } else {
      setStep(3);
    }
  };

  return (
    <>
      <div className="floating-cart-icon" onClick={() => setIsOpen(true)}>
        <FaShoppingCart size={24} />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>

      {isOpen && (
        <div className="cart-modal">
          <div className="cart-modal-header">
            <h5>Tu Carrito</h5>
            <button className="close-btn p-1" onClick={() => setIsOpen(false)}>
              <FaTimes size={23} />
            </button>
          </div>

          <div className="cart-modal-body">
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

            {step === 1 && (
              <div className="telefono-container">
                <input
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={telefonoUsuario}
                  onChange={handleTelefonoChange}
                  className="telefono-input"
                />
                <button onClick={handleConfirmarTelefono} className="confirm-telefono-btn">
                  Confirmar Teléfono
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="metodo-pago-container">
                <h6>Selecciona un Método de Pago:</h6>
                <select value={metodoPago} onChange={handleMetodoPagoChange} className="metodo-pago-select">
                  <option value="">Elige un método</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="efectivo">Efectivo</option>
                </select>
                <button onClick={handleConfirmarPago} className="confirm-pago-btn">
                  Confirmar Método de Pago
                </button>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="order-summary">
                  <h6>Resumen del Pedido:</h6>
                  {cart.map((producto, i) => (
                    <div key={i} className="order-item">
                      <p>
                        {producto.nombre} x {producto.cantidad} = ${producto.precio * producto.cantidad}
                      </p>
                    </div>
                  ))}
                  <div className="total-summary">
                    <p>Total: ${totalPrecio.toFixed(2)}</p>
                    {discount > 0 && <p>Descuento: {discount}%</p>}
                  </div>
                </div>
                <button
                  className="view-cart-btn"
                  onClick={registrarPedido}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Ir a Pagar"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;
