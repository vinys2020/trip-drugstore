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
import CrearCategoriaProducto from "../components/CrearCategoriaProducto";
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

  const subirImagenCloudinary = async (file, productoId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");  // tu preset aquí

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dcggcw8df/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        // Actualizamos en Firebase la URL de la imagen del producto
        await actualizarProducto(productoId, "imagen", data.secure_url);
      }
    } catch (error) {
      console.error("Error al subir imagen a Cloudinary:", error);
    }
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

    // Armar el objeto base del producto
    const productoAGuardar = {
      ...nuevoProducto,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      activo: true,
    };

    // Si la categoría es Bebidasid, agregar contenido
    if (categoriaSeleccionada === "Bebidasid") {
      // Si nuevoProducto.contenido no existe, asignar "sin alcohol" por defecto
      productoAGuardar.contenido = nuevoProducto.contenido || "sin alcohol";
    } else {
      // Para evitar que el campo contenido se guarde en otras categorías
      delete productoAGuardar.contenido;
    }

    await addDoc(productosRef, productoAGuardar);

    setNuevoProducto({ nombre: "", precio: "", imagen: "", marca: "", stock: "", contenido: "" });
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
            Gestiona todo desde un solo lugar: Categorias, Productos, Pedidos y Métricas.
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

        <section className="row mb-5">
          <article className="col-12">
            <div className="mt-5">
            <CrearCategoriaProducto />
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


                {["nombre", "precio", "marca", "stock"].map((campo) => (
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

                {categoriaSeleccionada === "Bebidasid" && (
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      value={nuevoProducto.contenido || "sin alcohol"}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          contenido: e.target.value,
                        })
                      }
                      onBlur={() => {
                        // Si queda vacío al perder foco, lo vuelve a poner "sin alcohol"
                        if (!nuevoProducto.contenido) {
                          setNuevoProducto({
                            ...nuevoProducto,
                            contenido: "sin alcohol",
                          });
                        }
                      }}
                    >
                      <option value="sin alcohol">Sin alcohol</option>
                      <option value="con alcohol">Con alcohol</option>
                    </select>
                  </div>
                )}




                {/* Campo especial para imagen con input file */}
                <div className="col-md-4">
                  {/* Campo de URL manual */}
                  <div className="mb-2">
                    <input
                      className="form-control"
                      placeholder="Imagen URL"
                      value={nuevoProducto.imagen}
                      onChange={(e) =>
                        setNuevoProducto({
                          ...nuevoProducto,
                          imagen: e.target.value,
                        })
                      }
                    />
                  </div>



                  {/* Selector de archivo */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control "
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          formData.append("upload_preset", "ml_default"); // reemplazar si usás otro preset

                          try {
                            const res = await fetch("https://api.cloudinary.com/v1_1/dcggcw8df/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const data = await res.json();
                            if (data.secure_url) {
                              setNuevoProducto((prev) => ({
                                ...prev,
                                imagen: data.secure_url,
                              }));
                            }
                          } catch (err) {
                            console.error("Error al subir imagen:", err);
                          }
                        }
                      }}
                    />
                  </div>
                </div>


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

                <table className="table table-bordered table-striped mb-5">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Imagen</th>
                      <th>Marca</th>
                      <th>Stock</th>
                      {categoriaSeleccionada === "Bebidasid" && <th>Contenido</th>}
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
                              style={{ minWidth: "400px" }}
                              value={producto.nombre}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "nombre", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              style={{ minWidth: "50px" }}

                              type="number"
                              value={producto.precio}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "precio", e.target.value)
                              }
                            />
                          </td>
                          <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Imagen URL"
                              value={producto.imagen || ""}
                              onChange={(e) =>
                                actualizarProducto(producto.id, "imagen", e.target.value)
                              }
                              style={{ flex: 1 }}
                            />
                            {/* Mostrar imagen */}
                            {producto.imagen && (
                              <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                              />
                            )}

                            <label
                              htmlFor={`file-upload-${producto.id}`}
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                borderRadius: "4px",
                                cursor: "pointer",
                                userSelect: "none",
                              }}
                            >
                              Subir
                            </label>
                            <input
                              id={`file-upload-${producto.id}`}
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const formData = new FormData();
                                  formData.append("file", e.target.files[0]);
                                  formData.append("upload_preset", "ml_default");

                                  try {
                                    const res = await fetch(
                                      "https://api.cloudinary.com/v1_1/dcggcw8df/upload",
                                      {
                                        method: "POST",
                                        body: formData,
                                      }
                                    );
                                    const data = await res.json();
                                    if (data.secure_url) {
                                      actualizarProducto(producto.id, "imagen", data.secure_url);
                                    }
                                  } catch (err) {
                                    console.error("Error al subir imagen:", err);
                                  }
                                }
                              }}
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

                          {categoriaSeleccionada === "Bebidasid" && (
                            <td>
                              <select
                                className="form-control"
                                value={producto.contenido || "sin alcohol"}
                                onChange={(e) =>
                                  actualizarProducto(producto.id, "contenido", e.target.value)
                                }
                                onBlur={() => {
                                  // Si queda vacío al perder foco, lo vuelve a poner "sin alcohol"
                                  if (!producto.contenido) {
                                    actualizarProducto(producto.id, "contenido", "sin alcohol");
                                  }
                                }}
                              >
                                <option value="sin alcohol">Sin alcohol</option>
                                <option value="con alcohol">Con alcohol</option>
                              </select>
                            </td>
                          )}






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


        <section className="row mb-5">
          <article className="col-12">
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
