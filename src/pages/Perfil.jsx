import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./perfil.css";

const Perfil = () => {
  const { usuario } = useContext(AuthContext); // Obtienes el usuario desde el contexto
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // Estado para manejar el pedido seleccionado

  useEffect(() => {
    const obtenerPedidos = async () => {
      if (usuario) {
        const q = query(collection(db, "Pedidosid"), where("cliente.email", "==", usuario.email));
        const querySnapshot = await getDocs(q);
        const pedidosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPedidos(pedidosData);
        setIsLoading(false);
      }
    };

    obtenerPedidos();
  }, [usuario]);

  if (!usuario) {
    return <div>Loading...</div>; // O cualquier otro mensaje mientras el usuario se autentica
  }

  // Datos de usuario desde Firebase
  const user = {
    nombre: usuario.displayName || "Nombre no disponible",
    email: usuario.email,
    foto: usuario.photoURL || "https://i.pravatar.cc/150?img=3", // Foto de Google auth
    puntos: 235, // Aquí podrías agregar lógica para obtener los puntos desde Firebase si lo deseas
  };

  const handleVerDetalle = (pedidoId) => {
    if (pedidoSeleccionado === pedidoId) {
      setPedidoSeleccionado(null); // Si el pedido ya está seleccionado, lo deseleccionamos
    } else {
      setPedidoSeleccionado(pedidoId); // Seleccionamos el pedido
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
          <h4 className="mb-3">🛒 Compras recientes</h4>
          {isLoading ? (
            <p>Cargando pedidos...</p>
          ) : pedidos.length === 0 ? (
            <p>No tienes pedidos realizados.</p>
          ) : (
            <ul className="list-group">
              {pedidos.map((pedido) => (
                <li key={pedido.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-black">Pedido ID: {pedido.id}</strong>
                      <div className="text-muted small">Estado: {pedido.estado}</div>
                      <div className="text-muted small">Método de pago: {pedido.metodopago}</div>
                    </div>
                    <span className="text-primary fw-bold">Total: ${pedido.totalpedido}</span>
                  </div>

                  {/* Botón para ver detalles */}
                  <button
                    className="btn btn-info btn-sm mt-2"
                    onClick={() => handleVerDetalle(pedido.id)}
                  >
                    {pedidoSeleccionado === pedido.id ? "Cerrar detalles" : "Ver detalles"}
                  </button>

                  {/* Mostrar detalles del pedido si está seleccionado */}
                  {pedidoSeleccionado === pedido.id && (
                    <div className="mt-3 text-black">
                      <h5>Detalles del Pedido:</h5>
                      <p><strong>Nombre:</strong> {pedido.cliente.nombre}</p>
                      <p><strong>Email:</strong> {pedido.cliente.email}</p>
                      <p><strong>Teléfono:</strong> {pedido.cliente.telefono}</p>
                      <p><strong>Dirección:</strong> {pedido.cliente.direccion}</p>
                      <p><strong>Entrega:</strong> {pedido.cliente.entrega}</p>
                      <p><strong>Fecha:</strong> {pedido.fecha.toDate().toLocaleString()}</p>
                      <p><strong>Estado:</strong> {pedido.estado}</p>
                      <p><strong>Método de pago:</strong> {pedido.metodopago}</p>

                      <h6>Productos:</h6>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Perfil;
