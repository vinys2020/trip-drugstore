// src/pages/AdminDashboard.jsx
import React from "react";
import "./admindashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Lunes", pedidos: 30 },
  { name: "Martes", pedidos: 50 },
  { name: "Miércoles", pedidos: 70 },
  { name: "Jueves", pedidos: 60 },
  { name: "Viernes", pedidos: 90 },
  { name: "Sábado", pedidos: 120 },
  { name: "Domingo", pedidos: 80 },
];

const AdminDashboard = () => {
  return (
    <section className="admin-dashboard py-5">
      <div className="container-fluid px-4 px-md-5">
        <header className="text-center mb-5">
          <h1 className="fw-bold display-5">👑 Panel de Administración</h1>
          <p className="text-white fs-5">Gestiona todo desde un solo lugar: usuarios, pedidos y métricas.</p>
        </header>

        {/* Estadísticas */}
        <section className="row g-4 mb-5">
          <article className="col-12 col-md-4">
            <div className="card card-orders text-center p-4 shadow-sm rounded-4">
              <h5>📦 Pedidos</h5>
              <h2 className="fw-bold">128</h2>
              <p className="text-white">Pedidos totales este mes</p>
            </div>
          </article>
          <article className="col-12 col-md-4">
            <div className="card card-users text-center p-4 shadow-sm rounded-4">
              <h5>👥 Usuarios</h5>
              <h2 className="fw-bold">542</h2>
              <p className="text-white">Usuarios registrados</p>
            </div>
          </article>
          <article className="col-12 col-md-4">
            <div className="card card-sales text-center p-4 shadow-sm rounded-4">
              <h5>💸 Ventas</h5>
              <h2 className="fw-bold">$15,230</h2>
              <p className="text-white">Ingresos este mes</p>
            </div>
          </article>
        </section>

        {/* Gráfico de pedidos por día */}
        <section className="row mb-5">
          <article className="col-12">
            <div className="card p-4 shadow-sm rounded-4">
              <h4 className="mb-4 text-black">📊 Pedidos por día</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pedidos" stroke="#007bff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        {/* Últimos pedidos */}
        <section className="row">
          <article className="col-12">
            <div className="card card-orders-list p-4 shadow-sm rounded-4">
              <h4 className="mb-4">🛒 Últimos pedidos</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>#00123 - Zapatillas Nike</span>
                  <span>$120</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>#00124 - Remera Adidas</span>
                  <span>$45</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>#00125 - Pantalón Puma</span>
                  <span>$60</span>
                </li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
