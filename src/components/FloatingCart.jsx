import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { db, auth } from "../config/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
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

      // --- 1) Creamos el objeto pedidoData ---
      const pedidoData = {
        cliente: {
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

      // --- 2) Guardamos en "Pedidosid" ---
      await addDoc(collection(db, "Pedidosid"), pedidoData);

      // --- 3) Calculamos cuántos puntos sumar ---
      const puntosGanados = totalItems > 1 ? 50 : 25;

      // --- 4) Buscamos el documento en “Usuariosid” por el campo `email` ---
      const usuariosCollection = collection(db, "Usuariosid");
      const q = query(usuariosCollection, where("email", "==", usuario.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Tomamos el primer documento donde `email === usuario.email`
        const usuarioDoc = querySnapshot.docs[0];
        const puntosPrevios = typeof usuarioDoc.data().puntos === "number"
          ? usuarioDoc.data().puntos
          : 0;
        const nuevosPuntos = puntosPrevios + puntosGanados;

        // Actualizamos solo el campo `puntos`
        await setDoc(usuarioDoc.ref, { puntos: nuevosPuntos }, { merge: true });
      } else {
        // Si no existe ningún registro con ese email, avisamos
        console.warn(
          `No se encontró ningún documento en "Usuariosid" con email = ${usuario.email}.`
        );
      }

      // --- 5) Vaciar carrito y resetear pasos ---
      vaciarCarrito();
      setIsOpen(false);
      setStep(1);
      setMetodoPago("");
      setIsLoading(false);

      alert("Pedido registrado correctamente y puntos sumados.");
    } catch (error) {
      console.error("Error al registrar el pedido y sumar puntos:", error);
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
              <div className="empty-cart-container">
                <img
                  src="https://res.cloudinary.com/dcggcw8df/image/upload/v1747783241/fzkloulqcyljutykpzmv.png"
                  alt="Carrito vacío"
                  className="empty-cart-image"
                  style={{ width: "100px", height: "100px" }}
                />
                <h2 className="empty-cart-title">Tu carrito está vacío</h2>
                <p className="empty-cart-text">Agregá productos para comenzar tu compra.</p>
                <a href="/categorias/Ofertasid" className="empty-cart-button">
                  Ver productos
                </a>
              </div>
            ) : (
              cart.map((producto, i) => (
                <div key={i} className="cart-item">
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="cart-item-details">
                    <h6>{producto.nombre}</h6>
                    <p>
                      ${producto.precio} x {producto.cantidad} = $
                      {producto.precio * producto.cantidad}
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

            <div className="steps-indicator">
              <div className={`step-circle ${step === 1 ? "active" : ""}`}>1</div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
              <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
              <div className={`step-circle ${step === 3 ? "active" : ""}`}>3</div>
            </div>

            {step === 1 && (
              <div className="telefono-container mt-4">
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    placeholder="Tu número de teléfono"
                    value={telefonoUsuario}
                    onChange={handleTelefonoChange}
                    className="form-control form-control-lg"
                  />
                </div>
                <button
                  onClick={handleConfirmarTelefono}
                  className="btn btn-primary btn w-100"
                >
                  Confirmar Teléfono
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="metodo-pago-container mt-4">
                <div className="mb-3">
                  <label htmlFor="metodoPago" className="form-label">
                    Selecciona un Método de Pago
                  </label>
                  <select
                    id="metodoPago"
                    value={metodoPago}
                    onChange={handleMetodoPagoChange}
                    className="form-select form-select-lg"
                  >
                    <option value="">Elige un método</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="efectivo">Efectivo</option>
                  </select>
                </div>
                <button
                  onClick={handleConfirmarPago}
                  className="btn btn-success btn-lg w-100"
                >
                  Confirmar Método de Pago
                </button>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="order-summary p-3 border rounded bg-light">
                  <h6 className="mb-3 fw-bold border-bottom pb-2">Resumen del Pedido:</h6>

                  {cart.map((producto, i) => (
                    <div
                      key={i}
                      className="order-item d-flex justify-content-between align-items-center py-2 border-bottom"
                    >
                      <div>
                        <span className="fw-semibold">{producto.nombre}</span> x <span>{producto.cantidad}</span>
                      </div>
                      <div>
                        <span className="fw-semibold">
                          ${(producto.precio * producto.cantidad).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <hr className="my-3" />

                  <div className="discount-applied d-flex justify-content-between align-items-center text-danger pb-2 border-bottom">
                    <span>Descuento por Puntos:</span>
                    <span>$0</span>
                  </div>

                  {discount > 0 && (
                    <>
                      <hr className="my-3" />
                      <div className="discount-summary d-flex justify-content-between align-items-center text-success pb-2 border-bottom">
                        <span>Descuento %:</span>
                        <span>{discount}%</span>
                      </div>
                    </>
                  )}

                  <hr className="my-3" />

                  <div className="total-summary d-flex justify-content-between align-items-center fs-5 fw-bold">
                    <span>Total:</span>
                    <span>${totalPrecio.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={registrarPedido}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Ir a Pagar"}
                </button>

                <button
                  className="btn btn-danger mt-3 w-100"
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estás seguro que querés vaciar el carrito? Se eliminarán todos los productos."
                      )
                    ) {
                      vaciarCarrito();
                      setStep(1);
                      setIsOpen(false);
                    }
                  }}
                >
                  Vaciar carrito
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
