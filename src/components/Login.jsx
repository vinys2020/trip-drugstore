import React, { useState, useEffect } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import userimgdef from "../assets/userimgdef.webp";
import confirmado from "../assets/confirmado.webp";
import celuchicaweb from "../assets/celuchica.webp";
import comprando from "../assets/comprando.webp";
import PreguntasFrecuentes from "../components/PreguntasFrecuentes";
import logo from "../assets/logotrippc.png";
import googleLogo from '../assets/google-logo-NePEveMl.webp';

import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../config/firebase";

const guardarUsuarioEnFirestore = async (user) => {
  const ref = doc(db, "Usuariosid", user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    // Crear usuario
    await setDoc(ref, {
      uid: user.uid,
      nombre: user.displayName || "",
      email: user.email,
      imagen: user.photoURL || "",
      creado: new Date(),
      puntos: 0,
      esAdmin: false,
      esEmpleado: false,
    });
  }

  // Verificar si ya tiene algún cupón
  const cuponesRef = collection(db, "Usuariosid", user.uid, "Cuponesid");
  const cuponesSnapshot = await getDocs(cuponesRef);

  if (cuponesSnapshot.empty) {
    // Solo si no tiene cupones, agregar uno nuevo
    await addDoc(cuponesRef, {
      nombre: "10% de Descuento",
      descuento: 10,
      fechaCompra: new Date(),
      usado: false,
    });
  }
};




const pasos = [
  {
    titulo: "Accede a beneficios exclusivos",
    descripcion: "Con tus compras sumas putos que luego podes canjealos por increíbles descuentos",
    imagen: confirmado,
  },
  {
    titulo: "Pedí fácil, rápido y sin complicaciones",
    descripcion: "100% online y sin tiempos de espera. Elegí los productos y cantidades que necesitás",
    imagen: comprando,
  },
  {
    titulo: "Continua los 3 simples pasos y ¡listo!",
    descripcion: "Verificá siempre que tus datos ingresados sean los correctos antes de realizar el pedido",
    imagen: celuchicaweb,
  },
];



const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const navigate = useNavigate();

  const correosAdmin = ["faculez07@gmail.com", "tripdrusgtore@gmail.com"];
  const correosEmpleado = ["faculez1@gmail.com"];

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root.style.backgroundColor;
    root.style.backgroundColor = "white";

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        document.body.classList.remove("overflow-hidden");

        const ref = doc(db, "Usuariosid", currentUser.uid);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          await guardarUsuarioEnFirestore(currentUser);
        }

        const userData = snapshot.exists() ? snapshot.data() : null;

        if (userData?.esAdmin || correosAdmin.includes(currentUser.email)) {
          navigate("/admin");
        } else if (userData?.esEmpleado || correosEmpleado.includes(currentUser.email)) {
          navigate("/empleado");
        } else {
          navigate("/");
        }
      }
    });

    const manejarOffcanvas = (e) => {
      if (e.type === "show.bs.offcanvas") document.body.classList.add("overflow-hidden");
      else document.body.classList.remove("overflow-hidden");
    };
    window.addEventListener("show.bs.offcanvas", manejarOffcanvas);
    window.addEventListener("hidden.bs.offcanvas", manejarOffcanvas);

    return () => {
      root.style.backgroundColor = originalBg || "";
      unsubscribe();
      window.removeEventListener("show.bs.offcanvas", manejarOffcanvas);
      window.removeEventListener("hidden.bs.offcanvas", manejarOffcanvas);
    };
  }, [navigate]);

  const redirigirSegunRol = async (currentUser) => {
    const ref = doc(db, "Usuariosid", currentUser.uid);
    const snapshot = await getDoc(ref);
    const userData = snapshot.exists() ? snapshot.data() : null;
  
    if (userData?.esAdmin || correosAdmin.includes(currentUser.email)) {
      navigate("/admin");
    } else if (userData?.esEmpleado || correosEmpleado.includes(currentUser.email)) {
      navigate("/empleado");
    } else {
      navigate("/");
    }
  };

  const loginConGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await guardarUsuarioEnFirestore(result.user);
      await redirigirSegunRol(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  
  const loginConEmail = async (e) => {
    e.preventDefault();
    try {
      let userCred;
      if (esRegistro) {
        if (!nombre.trim()) {
          return alert("Por favor, ingresá tu nombre.");
        }
        if (password !== confirmarPassword) {
          return alert("Las contraseñas no coinciden.");
        }
    
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: nombre, photoURL: userimgdef });
        await guardarUsuarioEnFirestore(userCred.user);
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      }
      await redirigirSegunRol(userCred.user);
    } catch (error) {
      alert("Ocurrió un error al iniciar sesión. Verificá tu email y contraseña.");
    }
  };
  
  


  const cerrarSesion = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  
  const [showConfirmarPassword, setShowConfirmarPassword] = useState(false);
  const toggleConfirmarPasswordVisibility = () => setShowConfirmarPassword(prev => !prev);

  return (
    <section className="login-page bg-white">
      <div className="container-main">
        <div className="row col-12">

          <aside className="col-12 col-lg-3 login-sidebar bg-dark">
            <div className="text-center mb-4 mt-lg-3 mt-4 me-5">
              <Link to="/" className="d-inline-block">
                <img
                  src={logo}
                  alt="Trip Drugstore"
                  style={{
                    height: "120px",
                    objectFit: "contain",
                    filter: "drop-shadow(2px 2px 0 black) drop-shadow(2px 2px 0 black)",
                  }}
                />
              </Link>
            </div>
            <h2 className="text-center mb-2 text-white">¡Bienvenido a Trip Drugstore!</h2>

            {user && (
              <p className="text-center text-white mb-3">
                Hola, {user.displayName || user.email}
              </p>
            )}

            <div className="text-center mb-4">
              <h5 className="text-white mb-3 mt-4">¿Ya tienes cuenta?</h5>
              <button className="btn btn-warning w-100 mb-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLogin" onClick={() => setEsRegistro(false)}>
                Ingresá aquí
              </button>
            </div>

            <div className="text-center mb-4">
              <h5 className="text-white mb-3">¿Sos nuevo?</h5>
              <button className="btn btn-light w-100 mb-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLogin" onClick={() => setEsRegistro(true)}>
                ¡Registrate!
              </button>
            </div>

            <div className="login-extra-info mt-0 ">
              <div className="info-item mb-3 mt-lg-2 mt-2">
                <h4 className="text-white">Pedidos por la App</h4>
                <p>Realizá pedidos fácil y rápido.</p>
              </div>
              <div className="info-item mb-3">
                <h4 className="text-white">Take Away</h4>
                <p>Terminal de Ómnibus Concepción - Local N*1</p>
              </div>
              <div className="contact-info">
                <h5 className="fw-bold text-white">Contáctanos</h5>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://www.instagram.com/tripconcep" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://wa.me/5493812024221" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="maincont col-12 col-md-12 col-lg-9">
            <article className="bg-white como-funciona-articulo mt-lg-5">
              <h1 className="comofunciona como-funciona-titulo">¿Cómo funciona?</h1>
            </article>

            <div className="container bg-white">
              <div className="row g-4 justify-content-center align-items-stech p-2 p-md-5 p-lg-4 sin-margen">
                {pasos.map((paso, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div className="info-card text-white bg-dark p-2 rounded-4 shadow-sm h-100">
                      <img
                        src={paso.imagen}
                        alt={`Ilustración ${paso.titulo}`}
                        className="img-fluid rounded-3 mb-3"
                        style={{ height: 220, objectFit: "cover", width: "100%" }}
                      />
                      <h3 className="text-center mb-3">{paso.titulo}</h3>
                      <p className="fs-6 text-center">{paso.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="justify-content-center p-4 mb-0 mt-5 mt-lg-5 bg-white">
              <div className="col-12 container">
                <div className="info-card text-white bg-primary p-5 rounded-4 shadow-sm text-center">
                  <i className="bi bi-trophy" style={{ fontSize: "3rem", color: "gold" }}></i>
                  <h3 className="text-center my-3">¡Gana puntos por cada pedido!</h3>
                  <p className="fs-6 text-center">Sumá puntos con cada compra y canjealos por increíbles regalos y excelentes descuentos.</p>
                </div>
              </div>
            </div>

            <div className="container mb-0 mt-5 mt-lg-4 p-lg-5 p-1">
              <PreguntasFrecuentes />
            </div>

            <div className="container mb-5 p-lg-5 p-1 mt-lg-0 mt-5">
              <h2 className="text-center fw-bold mb-5">Nuestros clientes opinan</h2>
              <div className="row g-4 justify-content-center">

                <div className="col-12 col-md-4">
                  <div className="info-card bg-light text-dark p-4 rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-center text-primary">María L.</h5>
                    <p className="fst-italic text-center">"Tiene muchas ofertas y un montón de productos"</p>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="info-card bg-light text-dark p-4 rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-center text-primary">Ariel Quinteros</h5>
                    <p className="fst-italic text-center">"Muy fácil de usar y con precios muy buenos. Me encanta poder hacer todo desde el celu."</p>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="info-card bg-light text-dark p-4 rounded-4 shadow-sm h-100">
                    <h5 className="fw-bold text-center text-primary">Juan Velázquez</h5>
                    <p className="fst-italic text-center">"¡Súper útil! puedo hacer mis pedidos cuando quiero"</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start text-white bg-dark" id="offcanvasLogin" tabIndex="-1">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title">{esRegistro ? "Registro" : "Iniciar sesión"}</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>

        <div className="offcanvas-body">
          <form onSubmit={loginConEmail}>
            {esRegistro && (
              <div className="mb-2 mb-lg-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  className="form-control"
                  type="text"
                  id="nombre"
                  placeholder="Ingresa tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-2 mb-lg-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2 mb-lg-3">
  <label htmlFor="password" className="form-label text-white">Contraseña:</label>
  <div className="input-group">
    <input
          placeholder="Ingresa tu contraseña"

      type={showPassword ? 'text' : 'password'}
      className="form-control"
      id="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ zIndex: 0 }}
    />
    <div className="input-group-append">
      <button
        className="btn btn-light"
        type="button"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        style={{
          borderColor: 'rgba(255, 255, 255, 0.95)',
          width: '40px',
          height: '45px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          zIndex: 0
        }}
      >
        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
      </button>
    </div>
  </div>
</div>


{esRegistro && (
  <div className="mb-4">
    <label htmlFor="confirmarPassword" className="form-label text-white">Confirmar Contraseña:</label>
    <div className="input-group mb-3">
      <input
        placeholder="Repite tu contraseña"
        type={showConfirmarPassword ? 'text' : 'password'}
        className="form-control"
        id="confirmarPassword"
        required
        value={confirmarPassword}
        onChange={(e) => setConfirmarPassword(e.target.value)}
        style={{ zIndex: 0 }}
      />
      <div className="input-group-append">
        <button
          className="btn btn-light"
          type="button"
          onClick={toggleConfirmarPasswordVisibility}
          aria-label={showConfirmarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          style={{
            borderColor: 'rgba(255, 255, 255, 0.95)',
            width: '40px',
            height: '45px',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            zIndex: 0
          }}
        >
          <i className={`bi ${showConfirmarPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
        </button>
      </div>
    </div>
  </div>
)}


            <button type="submit" className="btn btn-warning w-100">
              {esRegistro ? "Registrarse" : "Ingresar"}
            </button>
          </form>

          <hr className="mt-3 mb-3 bg-white" />

          <button
  onClick={loginConGoogle}
  className="google-btn d-flex align-items-center px-2 py-1 w-100"
>
  <div className="google-btn-logo me-2 d-flex align-items-center justify-content-center">
  <img src={googleLogo} width="20" height="20" alt="Logo de Google" />

  </div>
  <span className="google-btn-text">Continuar con Google</span>
</button>

        </div>
      </div>
    </section>
  );
};

export default Login;
