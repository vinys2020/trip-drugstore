import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { db, auth } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import HorizontalCarrito from "../components/HorizontalCarrito";
import "./Carrito.css";

const Carrito = () => {
  const {
    cart,
    eliminarDelCarrito,
    disminuirCantidad,
    agregarAlCarrito,
    totalPrecio,
    telefonoUsuario,
    setTelefonoUsuario,
    vaciarCarrito,
    discount,
  } = useContext(CartContext);

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
      alert("Iniciá sesión para hacer un pedido.");
      return;
    }

    try {
      setIsLoading(true);

      const pedido = {
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
        productos: cart.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad,
          preciounitario: p.precio,
          total: p.precio * p.cantidad,
        })),
        totalpedido: totalPrecio,
      };

      await addDoc(collection(db, "Pedidosid"), pedido);
      alert("¡Pedido realizado con éxito!");
      vaciarCarrito();
      setStep(1);
      setMetodoPago("");
    } catch (err) {
      console.error("Error al registrar pedido:", err);
      alert("Hubo un error al procesar el pedido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="carrito-pagina">
      <div className="container p-2">
        <h2 className="carrito-titulo">Tu Carrito de Compras</h2>
        <p className="text-center mb-lg-5 mb-4">
          Revisa tus productos, ajusta cantidades, elige método de pago y confirma tu pedido.
        </p>

        {cart.length === 0 ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "3rem 1rem",
    }}
  >
    <img
      src="https://res.cloudinary.com/dcggcw8df/image/upload/v1747783241/fzkloulqcyljutykpzmv.png"
      alt="Carrito vacío"
      style={{ width: "250px", height: "250px" }}
    />
    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
      Tu carrito está vacío
    </h2>
    <p style={{ fontSize: "1rem", color: "grey", marginBottom: "1rem" }}>
      Agregá productos para comenzar tu compra.
    </p>
    <a
      href="/categorias/Ofertasid"
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#3483fa",
        color: "white",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Ver productos
    </a>
  </div>
) : (

          <>
            <div className="carrito-contenido">
              {cart.map((producto, i) => (
                <article key={i} className="carrito-item">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="item-img"
                  />
                  <div className="item-detalles">
                  <h5 className="fs-6 line-clamp-2">{producto.nombre}</h5>
                    <p>
                      ${producto.precio} x {producto.cantidad} = $
                      {(producto.precio * producto.cantidad).toFixed(2)}
                    </p>

                    <div className="cantidad-controles">
                      <button
                        onClick={() => disminuirCantidad(producto.id)}
                        disabled={producto.cantidad <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span>{producto.cantidad}</span>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarDelCarrito(producto.id)}
                      aria-label="Eliminar producto"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Indicador de pasos */}
            <div className="steps-indicator mt-4">
              <div className={`step-circle ${step === 1 ? "active" : ""}`}>1</div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
              <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
              <div className={`step-circle ${step === 3 ? "active" : ""}`}>3</div>
            </div>

            {/* PASOS */}
            {step === 1 && (
  <div className="telefono-container mt-4">
    <div className="telefono-inner mx-auto">
      <label htmlFor="telefono" className="form-label text-center d-block">
        Número de Teléfono
      </label>
      <input
        type="tel"
        id="telefono"
        placeholder="Tu número de teléfono"
        value={telefonoUsuario}
        onChange={(e) => setTelefonoUsuario(e.target.value)}
        className="form-control form-control-md mx-auto mb-3"
      />
      <button
        onClick={() => {
          if (!telefonoUsuario.trim()) {
            alert("El número de teléfono es obligatorio.");
            return;
          }
          setStep(2);
        }}
        className="btn btn-primary d-flex justify-content-center align-items-center w-100 mx-auto"
        >
        Confirmar Teléfono
      </button>
    </div>
  </div>
)}


{step === 2 && (
  <div className="metodo-pago-container mt-4 d-flex justify-content-center">
    <div className="metodo-pago-inner">
      <label htmlFor="metodoPago" className="form-label text-center d-block">
        Selecciona un Método de Pago
      </label>
      <select
        id="metodoPago"
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        className="form-select form-select-md"
      >
        <option value="">Elige un método</option>
        <option value="tarjeta">Tarjeta</option>
        <option value="transferencia">Transferencia</option>
        <option value="efectivo">Efectivo</option>
      </select>
      <button
        onClick={() => {
          if (!metodoPago) {
            alert("Debes seleccionar un método de pago.");
            return;
          }
          setStep(3);
        }}
        className="btn btn-success mt-3 w-100"
      >
        Confirmar Método de Pago
      </button>
    </div>
  </div>
)}



{step === 3 && (
  <>
    <div className="order-summary p-3 border rounded bg-light text-dark">
      <h5 className="mb-3 fw-bold border-bottom pb-2">Resumen del Pedido:</h5>

      {cart.map((producto, i) => (
        <div
          key={i}
          className="order-item d-flex justify-content-between align-items-center py-2 border-bottom p-1 "
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
        }
      }}
    >
      Vaciar carrito
    </button>
  </>
)}

          </>
        )}

        <section id="servicios" className="mt-5">
          <div className="container-fluid px-0">
            <HorizontalCarrito />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Carrito;
