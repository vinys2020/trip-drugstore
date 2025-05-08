import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { db, auth } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import HorizontalCarrito from "../components/HorizontalCarrito"; // asegurate de la ruta correcta // Importa el componente Swiper
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
    if (!usuario) return alert("Iniciá sesión para hacer un pedido.");

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
<section className="container py-4 carrito-pagina">
    <h2 className="mb-4 text-center text-white">Tu Carrito de Compras</h2>
      <p className="text-white text-center mb-5">
        Aquí puedes revisar los productos que agregaste, ajustar cantidades, elegir cómo pagar y confirmar tu pedido.
      </p>
  {cart.length === 0 ? (
    <p className="vacio text-white text-center">Tu carrito está vacío.</p>
  ) : (
    <section className="carrito-contenido row ">
      {cart.map((producto, i) => (
        <article key={i} className="col-12 col-md-6 col-lg-4">
          <div className="carrito-item text-white border rounded p-3 bg-dark h-100 d-flex flex-column">
            <img src={producto.imagen} alt={producto.nombre} className="item-img mb-2 img-fluid rounded" />
            <div className="item-detalles flex-grow-1">
              <h5>{producto.nombre}</h5>
              <p>
                ${producto.precio} x {producto.cantidad} = ${producto.precio * producto.cantidad}
              </p>
              <div className="cantidad-controles d-flex align-items-center gap-2 mb-2">
                <button className="btn btn-outline-light btn-sm" onClick={() => disminuirCantidad(producto.id)} disabled={producto.cantidad <= 1}>-</button>
                <span>{producto.cantidad}</span>
                <button className="btn btn-outline-light btn-sm" onClick={() => agregarAlCarrito(producto)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(producto.id)}>
                Eliminar
              </button>
            </div>
          </div>
        </article>
      ))}

      <article className="col-12 mt-0">
        {step === 1 && (
          <div className="paso d-flex flex-column align-items-center">
            <input
              type="tel"
              className="form-control mb-2 w-100 w-md-50"
              placeholder="Tu número de teléfono"
              value={telefonoUsuario}
              onChange={(e) => setTelefonoUsuario(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => telefonoUsuario ? setStep(2) : alert("Teléfono requerido")}>
              Confirmar Teléfono
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="paso d-flex flex-column align-items-center">
            <select className="form-select mb-2 w-100 w-md-50" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
              <option value="">Selecciona método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
            <button className="btn btn-primary" onClick={() => metodoPago ? setStep(3) : alert("Seleccioná un método")}>
              Confirmar Método
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-white bg-secondary p-3 rounded mt-3">
            <h5>Resumen:</h5>
            {cart.map((p, i) => (
              <p key={i}>{p.nombre} x {p.cantidad} = ${p.precio * p.cantidad}</p>
            ))}
            <p>Total: ${totalPrecio}</p>
            {discount > 0 && <p>Descuento aplicado: {discount}%</p>}
            <button className="btn btn-success mt-2" onClick={registrarPedido} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Confirmar Pedido"}
            </button>
          </div>
        )}
      </article>
    </section>
    
  )}

<section id="servicios" className=" mt-5">
        <div className="container-fluid w-100 mt-3">

          {/* Contenedor para el HorizontalCarousel */}
          <div className="container px-0">
            <HorizontalCarrito />
          </div>
        </div>

        </section>


</section>



  );
};

export default Carrito;
