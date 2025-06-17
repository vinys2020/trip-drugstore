import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const PedidosEmpleado = () => {
  const [pedidosListos, setPedidosListos] = useState(0);
  const [pedidosEnPreparacion, setPedidosEnPreparacion] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const [ingresosDia, setIngresosDia] = useState(0);

  useEffect(() => {
    const pedidosRef = collection(db, "Pedidosid");
  
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);
  
    const q = query(
      pedidosRef,
      where("fecha", ">=", Timestamp.fromDate(inicioDia)),
      where("fecha", "<=", Timestamp.fromDate(finDia))
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let listos = 0;
      let enPreparacion = 0;
      let pendientes = 0;
  
      snapshot.forEach((doc) => {
        const pedido = doc.data();
        const estado = pedido.estado?.toLowerCase();
  
        if (estado === "listo") listos++;
        else if (estado === "en preparación") enPreparacion++;
        else if (estado === "pendiente") pendientes++;
      });
  
      setPedidosListos(listos);
      setPedidosEnPreparacion(enPreparacion);
      setPedidosPendientes(pendientes);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const obtenerIngresosDia = () => {
      const pedidosRef = collection(db, "Pedidosid");
      const inicioDia = new Date();
      inicioDia.setHours(0, 0, 0, 0);
      const finDia = new Date();
      finDia.setHours(23, 59, 59, 999);

      const q = query(
        pedidosRef,
        where("fecha", ">=", Timestamp.fromDate(inicioDia)),
        where("fecha", "<=", Timestamp.fromDate(finDia))
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          const pedido = doc.data();
          total += pedido.totalpedido || 0;
        });
        setIngresosDia(total);
      });

      return unsubscribe;
    };

    const unsubscribeIngresos = obtenerIngresosDia();

    return () => unsubscribeIngresos();
  }, []);

  return (
    <section className="row g-4 mb-5 mx-0">
      <article className="col-12 col-md-3">
        <div className="card text-center p-4 shadow-sm rounded-4 scale bg-primary">
          <h5 className="text-white">💰 Ingresos del día</h5>
          <h2 className="fw-bold text-white">${ingresosDia.toFixed(2)}</h2>
          <p className="text-white">Total facturado hoy</p>
        </div>
      </article>

      <article className="col-12 col-md-3">
        <div className="card text-center p-4 shadow-sm rounded-4 scale bg-danger">
          <h5 className="text-white">📥 Pedidos Pendientes</h5>
          <h2 className="fw-bold text-white">{pedidosPendientes}</h2>
          <p className="text-white">Pedidos con estado pendiente</p>
        </div>
      </article>

      <article className="col-12 col-md-3">
        <div className="card text-center p-4 shadow-sm rounded-4 scale bg-warning">
          <h5 className="text-white">⏳ En preparación</h5>
          <h2 className="fw-bold text-white">{pedidosEnPreparacion}</h2>
          <p className="text-white">Pedidos activos en preparación</p>
        </div>
      </article>

      <article className="col-12 col-md-3">
        <div className="card text-center p-4 shadow-sm rounded-4 scale bg-success">
          <h5 className="text-white">✅ Pedidos Listos</h5>
          <h2 className="fw-bold text-white">{pedidosListos}</h2>
          <p className="text-white">Pedidos finalizados</p>
        </div>
      </article>
    </section>
  );
};

export default PedidosEmpleado;
