import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../config/firebase";
import "./perfil.css";

const pedidosPorPagina = 5;

const Perfil = () => {
  const { usuario } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [datosUsuario, setDatosUsuario] = useState(null);


  useEffect(() => {
    const obtenerPedidosYUsuario = async () => {
      if (usuario) {
        const q = query(collection(db, "Pedidosid"), where("cliente.email", "==", usuario.email));
        const querySnapshot = await getDocs(q);
        const pedidosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        pedidosData.sort((a, b) => b.fecha.toDate() - a.fecha.toDate());
        setPedidos(pedidosData);

        const userDocRef = doc(db, "Usuariosid", usuario.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setDatosUsuario(userDocSnap.data());
        } else {
          console.warn("El documento del usuario no existe en Usuariosid");
        }

        setIsLoading(false);
      }
    };

    obtenerPedidosYUsuario();
  }, [usuario]);


  const comprarCupon = async (nombre, descuento, costoPuntos) => {
    if (!usuario || !datosUsuario) return;

    if (datosUsuario.puntos < costoPuntos) {
      alert("No tienes puntos suficientes para canjear este cupón.");
      return;
    }

    try {
      const userDocRef = doc(db, "Usuariosid", usuario.uid);
      await updateDoc(userDocRef, {
        puntos: datosUsuario.puntos - costoPuntos,
      });

      const cuponData = {
        nombre,
        descuento,
        usado: false,
        fechaCompra: new Date(),
      };

      const cuponesCollectionRef = collection(db, "Usuariosid", usuario.uid, "Cuponesid");
      await addDoc(cuponesCollectionRef, cuponData);

      setDatosUsuario((prev) => ({
        ...prev,
        puntos: prev.puntos - costoPuntos,
      }));

      alert(`¡Cupón "${nombre}" comprado con éxito!`);
    } catch (error) {
      console.error("Error comprando cupón:", error);
      alert("Hubo un error al comprar el cupón. Intenta nuevamente.");
    }
  };



  if (!usuario) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{ minHeight: "80vh", paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <h3 className="text-white d-flex align-items-center gap-2 mb-2 mt-lg-4">
          Debes iniciar sesión para ver tus compras.
          <i className="bi bi-arrow-up-right-circle-fill fs-4 text-warning icono-direccion"></i>
        </h3>
        <img
          src="https://res.cloudinary.com/dcggcw8df/image/upload/v1748991756/p416e5ggh9yvtovqgrpc.png"
          alt="Iniciar sesión requerido"
          className="perfil-img-login mb-3"
        />
        <p className="text-white mb-2 px-2 small">
          Tu información está segura con nosotros 🔒. Solo tú puedes ver tus compras y beneficios.
        </p>
        <p className="text-white small px-2 mb-lg-5 mb-1">
          ¿No tenés cuenta?{" "}
          <a href="/login" className="link-hover-underline fw-bold text-warning">
            Registrate gratis y empezá a sumar puntos hoy.
          </a>
        </p>
      </div>
    );
  }



  const user = {
    nombre: datosUsuario?.nombre || usuario.displayName || "Nombre no disponible",
    email: usuario.email,
    foto: usuario.photoURL || "https://i.pravatar.cc/150?img=3",
    puntos: datosUsuario?.puntos ?? 0,
  };


  const handleVerDetalle = (pedidoId) => {
    setPedidoSeleccionado((prev) => (prev === pedidoId ? null : pedidoId));
  };

  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
  const pedidosPaginados = pedidos.slice(
    (paginaActual - 1) * pedidosPorPagina,
    paginaActual * pedidosPorPagina
  );

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case "listo":
        return "text-success fw-bold";
      case "en preparación":
        return "text-warning fw-bold";
      case "pendiente":
        return "text-secondary";
      default:
        return "text-primary";
    }
  };

  const obtenerIconoEstado = (estado) => {
    if (estado === "pendiente") return "⏳";
    if (estado === "En preparación") return "🍳";
    return "✅"; 
  };

  const obtenerIconoPago = (metodo) => {
    switch (metodo?.toLowerCase()) {
      case "efectivo":
        return "💵";
      case "tarjeta":
        return "💳";
      case "transferencia":
        return "📲";
      default:
        return "💰";
    }
  };



  return (
    <section className="perfil-container">
      <div className="perfil-card shadow-lg rounded-4 p-4">
        <div className="perfil-header d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
          <img src={user.foto} alt="Foto de perfil" className="perfil-foto rounded-circle shadow" />
          <div>
            <h2 className="fw-bold">{user.nombre}</h2>
            <p className="text-muted mb-1">{user.email}</p>
            <span className="badge bg-success fs-6">⭐ {user.puntos} puntos acumulados</span>
          </div>
        </div>

        <div className="perfil-section">
          <section className="mb-5">
            <h4 className="mb-3">🛒 Historial De Compras</h4>
            {isLoading ? (
              <p>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
              <p>No tienes pedidos realizados.</p>
            ) : (
              <>
                <article className="compras-recientes">
                  <ul className="list-group">
                    {pedidosPaginados.map((pedido) => (
                      <li key={pedido.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="text-black">Pedido ID: {pedido.id}</strong>
                            <div className={`small ${obtenerClaseEstado(pedido.estado)}`}>
                              {obtenerIconoEstado(pedido.estado)} Estado: {pedido.estado}
                            </div>
                            <div className="text-muted small">
                              Método de pago: {obtenerIconoPago(pedido.metodopago)} {pedido.metodopago}
                            </div>
                          </div>
                          <span className="text-success fw-bold">Total: ${pedido.totalpedido}</span>
                        </div>

                        <button
                          className="btn btn-info btn-sm mt-2"
                          onClick={() => handleVerDetalle(pedido.id)}
                        >
                          {pedidoSeleccionado === pedido.id ? "Cerrar detalles" : "Ver detalles"}
                        </button>

                        {pedidoSeleccionado === pedido.id && (
                          <div className="mt-3 text-black">
                            <h5>📦 Detalles del Pedido:</h5>
                            <p><strong>Nombre:</strong> {pedido.cliente.nombre}</p>
                            <p><strong>Email:</strong> {pedido.cliente.email}</p>
                            <p><strong>Teléfono:</strong> {pedido.cliente.telefono}</p>
                            <p><strong>Dirección:</strong> {pedido.cliente.direccion}</p>
                            <p><strong>Entrega:</strong> {pedido.cliente.entrega}</p>
                            <p><strong>Fecha:</strong> {pedido.fecha.toDate().toLocaleString()}</p>
                            <p><strong>Estado:</strong> <span className={obtenerClaseEstado(pedido.estado)}>{obtenerIconoEstado(pedido.estado)} {pedido.estado}</span></p>
                            <p><strong>Método de pago:</strong> {pedido.metodopago}</p>

                            <h6>🛍️ Productos:</h6>
                            <ul className="list-group">
                              {pedido.productos.map((producto, index) => (
                                <li key={index} className="list-group-item text-black">
                                  <strong>{producto.nombre}</strong>
                                  <div>Cantidad: {producto.cantidad}</div>
                                  <div>Precio unitario: ${producto.preciounitario}</div>
                                  <div>Total: ${producto.total}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>

                <div className="d-flex justify-content-between align-items-center mt-3 gap-2 small">
                  <button
                    className="btn btn-outline-secondary btn-sm p-2 mx-auto"
                    onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                    disabled={paginaActual === 1}
                  >
                    Anterior
                  </button>
                  <span className="fw-semibold text-center">
                    Página {paginaActual} de {totalPaginas}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm p-2 mx-auto"
                    onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaActual === totalPaginas}
                  >
                    Siguiente
                  </button>
                </div>


              </>
            )}
          </section>

          <section className="puntos-beneficios border-top pt-4 mt-5">
            <h4 className="mb-3">🎁 Canjea tus puntos</h4>
            <p className="text-muted">
    🎯 Por cada compra mayor a $10.000 obtendrás <strong>25 puntos</strong>, y por compras mayores a $20.000 sumarás <strong>50 puntos</strong>. 
    Acumulá puntos en tus compras y canjealos por increíbles cupones de descuento.
  </p>            <article className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-black"><i className="bi bi-tag me-1"></i>10% de descuento</h5>
                    <hr className="bg-dark" />

                    <p className="card-text text-center">Canjea 150 puntos para obtener un 10% de descuento en tu próxima compra.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-center border-0 bg-white">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => comprarCupon("10% de Descuento", 10, 150)}
                      disabled={datosUsuario?.puntos < 150}
                    >
                      Canjear
                    </button>
                  </div>

                </div>
              </div>

              <div className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-black" ><i className="bi bi-star-fill me-1"></i>20% de descuento</h5>
                    <hr className="bg-dark" />

                    <p className="card-text text-center">Canjea 250 puntos para obtener un 20% de descuento en tu próxima compra.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-center border-0 bg-white">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => comprarCupon("20% de Descuento", 20, 250)}
                      disabled={datosUsuario?.puntos < 250}
                    >
                      Canjear
                    </button>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-black"><i className="bi bi-gift me-1"></i>30% de descuento</h5>
                    <hr className="bg-dark" />

                    <p className="card-text text-center">Canjea 350 puntos para obtener un 30% de descuento en tu próxima compra.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-center border-0 bg-white">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => comprarCupon("30% de Descuento", 30, 350)}
                      disabled={datosUsuario?.puntos < 350}
                    >
                      Canjear
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </section>


        </div>
      </div>
    </section>
  );
};

export default Perfil;
