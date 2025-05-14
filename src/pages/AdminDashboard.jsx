// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
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
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import AdminPedidos from "../components/AdminPedidos";



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
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Articuloslimpiezaid");
  const [busqueda, setBusqueda] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    marca: "",
    stock: "",
  });

  const obtenerCategorias = async () => {
    const categoriasRef = collection(db, "Categoriasid");
    const data = await getDocs(categoriasRef);
    const categoriasList = data.docs.map((doc) => doc.id);
    setCategorias(categoriasList);
  };


  const obtenerProductos = async () => {
    const productosRef = collection(db, `Categoriasid/${categoriaSeleccionada}/Productosid`);
    const data = await getDocs(productosRef);
    const productosList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProductos(productosList);
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerProductos();
  }, [categoriaSeleccionada]);

  const crearProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;
    const productosRef = collection(db, `Categoriasid/${categoriaSeleccionada}/Productosid`);
    await addDoc(productosRef, {
      ...nuevoProducto,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      activo: true,
    });
    setNuevoProducto({ nombre: "", precio: "", imagen: "", marca: "", stock: "" });
    obtenerProductos();
  };

  const actualizarProducto = async (id, campo, valor) => {
    const productoDoc = doc(db, `Categoriasid/${categoriaSeleccionada}/Productosid`, id);
    try {
      await updateDoc(productoDoc, {
        [campo]: campo === "precio" || campo === "stock" ? Number(valor) : valor,
      });

      // Actualizar producto localmente en el estado sin recargar toda la lista
      setProductos((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
              ...p,
              [campo]: campo === "precio" || campo === "stock" ? Number(valor) : valor,
            }
            : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };


  const eliminarProducto = async (id) => {
    const productoDoc = doc(db, `Categoriasid/${categoriaSeleccionada}/Productosid`, id);
    await deleteDoc(productoDoc);
    obtenerProductos();
  };

  return (
    <section className="admin-dashboard py-5 mt-lg-5">
      <div className="container-fluid px-4 px-md-5">
        <header className="text-center mb-5">
          <h1 className="fw-bold display-5">Panel de Administración</h1>
          <p className="text-white fs-5 ">
            Gestiona todo desde un solo lugar: Productos, Pedidos y Métricas.
          </p>
        </header>


        {/* Estadísticas */}
        <section className="row g-4 mb-5">
          <article className="col-12 col-md-4">
            <div className="card card-orders text-center p-4 shadow-sm rounded-4 scale">
              <h5>📦 Pedidos</h5>
              <h2 className="fw-bold">128</h2>
              <p className="text-white">Pedidos totales este mes</p>
            </div>
          </article>
          <article className="col-12 col-md-4">
            <div className="card card-users text-center p-4 shadow-sm rounded-4 scale">
              <h5>👥 Usuarios</h5>
              <h2 className="fw-bold">542</h2>
              <p className="text-white">Usuarios registrados</p>
            </div>
          </article>
          <article className="col-12 col-md-4">
            <div className="card card-sales text-center p-4 shadow-sm rounded-4 scale">
              <h5>💸 Ventas</h5>
              <h2 className="fw-bold">$15,230</h2>
              <p className="text-white">Ingresos este mes</p>
            </div>
          </article>
        </section>



        {/* CRUD de productos */}
        <section className="row mt-5">
          <article className="col-12 mt-lg-5">
            <div className="cards shadow-sm rounded-4">
            <h2 className="text-center mb-4 text-black">
              <i className="bi bi-clipboard-check me-2"></i>Gestiona tus Productos
            </h2>
              <div className="d-flex justify-content-center">
                <div className="w-100">
                  <div className="card  rounded-4 p-4 bg-primary">
                    <div className="mb-4">
                      <h5 className="text-white mb-3">Elige una categoría:</h5>
                      <select
                        className="form-select form-select-lg"
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                      >
                        {categorias.map((categoria) => (
                          <option key={categoria} value={categoria}>
                            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mb-0 text-black text-center mt-5">
                <i className="bi bi-gear"></i> {/* Este es el ícono de configuración */}
                {categoriaSeleccionada}
              </h3>
              <hr className="bg-dark mb-4" />

              {/* Formulario de nuevo producto */}
              <div className="row g-2 mb-4">
                <h4 className="text-black d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-plus-circle"></i>
                  Agregar producto
                </h4>

                {["nombre", "precio", "imagen", "marca", "stock"].map((campo) => (
                  <div className="col-md-4" key={campo}>
                    <input
                      className="form-control"
                      placeholder={campo}
                      value={nuevoProducto[campo]}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          [campo]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
                <div className="col-md-4 d-grid">
                  <button onClick={crearProducto} className="btn btn-success">
                    ➕ Agregar
                  </button>
                </div>
              </div>

              <h4 className="mb-3 text-black d-flex align-items-center gap-2 mt-3">
                <i className="bi bi-pencil-square"></i>
                Modificar productos
              </h4>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar producto por nombre..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>



              {/* Tabla de productos */}
              <div className="table-responsive mb-5">

                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Imagen</th>
                      <th>Marca</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos
                      .filter((producto) =>
                        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
                      )
                      .map((producto) => (
                        <tr key={producto.id}>
                          <td>
                            <input
                              className="form-control"
                              value={producto.nombre}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "nombre", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              value={producto.precio}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "precio", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              value={producto.imagen}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "imagen", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              value={producto.marca}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "marca", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              value={producto.stock}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "stock", e.target.value)
                              }
                            />
                          </td>
                          <td className="text-center">
                            <button
                              className={`btn btn-sm ${producto.activo ? "btn-success" : "btn-secondary"
                                }`}
                              onClick={() =>
                                actualizarProducto(producto.id, "activo", !producto.activo)
                              }
                            >
                              {producto.activo ? "Activo" : "Inactivo"}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => eliminarProducto(producto.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}

                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </section>


        <section className="row py-5 mb-5">
          <article className="col-12">
            {/* Aquí va la Sección de Pedidos */}
            <div className="admin-pedidos-section mt-5">
              <AdminPedidos />
            </div>
          </article>
        </section>



        {/* Gráfico de pedidos por día */}
        <section className="row py-5 mb-5">
          <article className="col-12">
            <h2 className="text-center mb-4 text-white mt-lg-3">Estadisticas</h2>
            <div className="card mb-0 shadow-sm rounded-4">
              <h4 className="mb-4 text-black">📊 Pedidos por día</h4>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pedidos"
                    stroke="#007bff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

      </div>
    </section>
  );
};

export default AdminDashboard;
