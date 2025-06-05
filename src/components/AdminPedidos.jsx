import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import emailjs from '@emailjs/browser';

import "./adminpedidos.css";

emailjs.init('lO8HCYln-rXEwoAgm');  // Tu Public Key de EmailJS

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Pedidosid"), (snapshot) => {
      const pedidosData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.fecha?.toDate() - a.fecha?.toDate());

      setPedidos(pedidosData);
    });

    return () => unsubscribe();
  }, []);

  const handleVerDetalle = (pedidoId) => {
    setPedidoSeleccionado((prevId) => (prevId === pedidoId ? null : pedidoId));
  };



  
  

  

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    const pedidoRef = doc(db, "Pedidosid", pedidoId);
    const pedido = pedidos.find((p) => p.id === pedidoId);
  
    if (!pedido) return;
  
    await updateDoc(pedidoRef, { estado: nuevoEstado });
    const fechaFormateada = pedido.fecha?.toDate().toLocaleString('es-AR') || '';


  
    if (nuevoEstado === "Listo" && pedido.cliente?.email) {
      const templateParams = {
        nombre: pedido.cliente.nombre || "Cliente",
        email: pedido.cliente.email,
        order_id: pedido.id,
        totalpedido: pedido.totalpedido,
        productos: pedido.productos?.map((producto) => ({
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          total: producto.total,
        })) || [],
        fechapedido: fechaFormateada, // <--- acá la fecha




      };
  
      emailjs
        .send("default_service", "template_h0wvzcy", templateParams)
        .then(
          (result) => {
            console.log("Email enviado:", result.text);
          },
          (error) => {
            console.error("Error al enviar email:", error);
          }
        );
    }
  };
  

  const filtrarPedidos = () => {
    return pedidos.filter((pedido) =>
      filtro === "Todos"
        ? true
        : (pedido.estado || "").toLowerCase().trim() === filtro.toLowerCase().trim()
    );
  };
  

  const pedidosFiltrados = filtrarPedidos();
  const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
  const indiceInicio = (paginaActual - 1) * pedidosPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(indiceInicio, indiceInicio + pedidosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const obtenerClaseEstado = (estado) => {
    const estadoNormalizado = (estado || "").toLowerCase().trim();
    if (estadoNormalizado === "pendiente") return "estado-pendiente";
    if (estadoNormalizado === "en preparación") return "estado-preparacion";
    if (estadoNormalizado === "listo") return "estado-listo";
    return "";
  };
  

  return (
    <section className="container-fluid">
      <div className="row justify-content-center">
        <article className="col-12 col-md-10 col-lg-8">
          <div className="adminpedidos-card shadow-lg rounded-4 p-4">
            <h2 className="adminpedidos-title mb-4 text-center text-dark">📦 Gestiona tus Pedidos</h2>

            <div className="mb-3 d-flex gap-2 flex-wrap justify-content-center">
              <select
                className="form-select w-auto"
                value={filtro}
                onChange={(e) => {
                  setFiltro(e.target.value);
                  setPaginaActual(1);
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En preparación">En preparación</option>
                <option value="Listo">Listo</option>
              </select>
            </div>

            {pedidosPaginados.length === 0 ? (
              <p>No hay pedidos para mostrar.</p>
            ) : (
              <ul className="adminpedidos-list-group">
                {pedidosPaginados.map((pedido) => (
                  <li key={pedido.id} className={`adminpedidos-item p-3 mb-3 rounded-3 ${obtenerClaseEstado(pedido.estado)}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="adminpedidos-id text-dark">Pedido ID: {pedido.id}</strong>
                        <div className="adminpedidos-status text-muted small">Estado: {pedido.estado}</div>
                        <div className="adminpedidos-payment-method text-muted small">Método de pago: {pedido.metodopago}</div>
                      </div>
                      <span className="adminpedidos-total text-success fw-bold">Total: ${pedido.totalpedido}</span>
                    </div>

                    <div className="mt-2 d-flex gap-2 flex-column flex-md-row">
                      <button
                        className="adminpedidos-btn-preparacion btn btn-warning btn-sm w-100 w-md-auto text-white"
                        onClick={() => cambiarEstado(pedido.id, "En preparación")}
                      >
                        En preparación
                      </button>
                      <button
                        className="adminpedidos-btn-listo btn btn-success btn-sm w-100 w-md-auto text-white"
                        onClick={() => cambiarEstado(pedido.id, "Listo")}
                      >
                        Listo
                      </button>
                      <button
                        className="adminpedidos-btn-detalles btn btn-info btn-sm w-100 w-md-auto text-white"
                        onClick={() => handleVerDetalle(pedido.id)}
                      >
                        {pedidoSeleccionado === pedido.id ? "Cerrar detalles" : "Ver detalles"}
                      </button>
                    </div>

                    {pedidoSeleccionado === pedido.id && (
  <div className="adminpedidos-details mt-3">
    <h5 className="text-dark">Detalles del Pedido:</h5>
    <p className="text-dark"><strong>Nombre:</strong> {pedido.cliente?.nombre}</p>
    <p className="text-dark"><strong>Email:</strong> {pedido.cliente?.email}</p>
    <p className="text-dark"><strong>Teléfono:</strong> {pedido.cliente?.telefono}</p>
    <p className="text-dark"><strong>Dirección:</strong> {pedido.cliente?.direccion}</p>
    <p className="text-dark"><strong>Entrega:</strong> {pedido.cliente?.entrega}</p>
    <p className="text-dark"><strong>Fecha:</strong> {pedido.fecha?.toDate().toLocaleString()}</p>
    <p className="text-dark"><strong>Estado:</strong> {pedido.estado}</p>
    <p className="text-dark"><strong>Método de pago:</strong> {pedido.metodopago}</p>

    {pedido.cliente?.descuento > 0 && (
  <>
    <p className="text-dark"><strong>Descuento aplicado:</strong> %{pedido.cliente.descuento}</p>
    <p className="text-dark "><strong>Total con descuento:</strong> ${pedido.totalpedido}</p>
  </>
)}

    <h6 className="text-black">Productos:</h6>
    <ul className="adminpedidos-productos">
      {pedido.productos?.map((producto, index) => (
        <li key={index} className="adminpedidos-producto text-black">
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

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>
                <span className="align-self-center">Página {paginaActual} de {totalPaginas}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AdminPedidos;
