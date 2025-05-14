import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import "./adminpedidos.css";

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Pedidosid"), (snapshot) => {
      const pedidosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(pedidosData);
    });

    return () => unsubscribe(); // Cleanup al desmontar
  }, []);

  const handleVerDetalle = (pedidoId) => {
    setPedidoSeleccionado((prevId) => (prevId === pedidoId ? null : pedidoId));
  };

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    const pedidoRef = doc(db, "Pedidosid", pedidoId);
    await updateDoc(pedidoRef, {
      estado: nuevoEstado,
    });
  };

  return (
    <section className="container-fluid">
      <div className="row justify-content-center">
        <article className="col-12 col-md-10 col-lg-8">
          <div className="admin-pedidos-card shadow-lg rounded-4 p-4">
            <h2 className="admin-pedidos-title mb-4 text-center text-dark">📦 Gestiona tus Pedidos</h2>
            {pedidos.length === 0 ? (
              <p>No hay pedidos registrados.</p>
            ) : (
              <ul className="list-group">
                {pedidos.map((pedido) => (
                  <li key={pedido.id} className="admin-pedidos-item list-group-item p-3 mb-3 rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="admin-pedidos-id text-dark">Pedido ID: {pedido.id}</strong>
                        <div className="admin-pedidos-status text-muted small">Estado: {pedido.estado}</div>
                        <div className="admin-pedidos-payment-method text-muted small">Método de pago: {pedido.metodopago}</div>
                      </div>
                      <span className="admin-pedidos-total text-success fw-bold">Total: ${pedido.totalpedido}</span>
                    </div>

                    <div className="mt-2 d-flex gap-2 flex-column flex-md-row">
                      <button
                        className="admin-pedidos-btn-preparacion btn btn-outline-warning btn-sm w-100 w-md-auto text-white"
                        onClick={() => cambiarEstado(pedido.id, "En preparación")}
                      >
                        En preparación
                      </button>
                      <button
                        className="admin-pedidos-btn-listo btn btn-outline-success btn-sm w-100 w-md-auto text-white"
                        onClick={() => cambiarEstado(pedido.id, "Listo")}
                      >
                        Listo
                      </button>
                      <button
                        className="admin-pedidos-btn-detalles btn btn-info btn-sm w-100 w-md-auto text-white"
                        onClick={() => handleVerDetalle(pedido.id)}
                      >
                        {pedidoSeleccionado === pedido.id ? "Cerrar detalles" : "Ver detalles"}
                      </button>
                    </div>

                    {pedidoSeleccionado === pedido.id && (
                      <div className="admin-pedidos-details mt-3">
                        <h5 className="text-dark">Detalles del Pedido:</h5>
                        <p className="text-dark"><strong>Nombre:</strong> {pedido.cliente?.nombre}</p>
                        <p className="text-dark"><strong>Email:</strong> {pedido.cliente?.email}</p>
                        <p className="text-dark"><strong>Teléfono:</strong> {pedido.cliente?.telefono}</p>
                        <p className="text-dark"><strong>Dirección:</strong> {pedido.cliente?.direccion}</p>
                        <p className="text-dark"><strong>Entrega:</strong> {pedido.cliente?.entrega}</p>
                        <p className="text-dark"><strong>Fecha:</strong> {pedido.fecha?.toDate().toLocaleString()}</p>
                        <p className="text-dark"><strong>Estado:</strong> {pedido.estado}</p>
                        <p className="text-dark"><strong>Método de pago:</strong> {pedido.metodopago}</p>

                        <h6 className="text-black">Productos:</h6>
                        <ul className="admin-pedidos-productos list-group">
                          {pedido.productos?.map((producto, index) => (
                            <li key={index} className="admin-pedidos-producto list-group-item text-black">
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
        </article>
      </div>
    </section>
  );
};

export default AdminPedidos;
