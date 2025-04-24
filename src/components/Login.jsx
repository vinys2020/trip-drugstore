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
import userimgdef from "../assets/userimgdef.webp";
import BannerCard from "../components/BannerCard";
import cafeteyerba from "../assets/cafeteyerba.webp";

const pasos = [
  {
    titulo: "Ingresá con tu mail y contraseña",
    descripcion: "Identificate para poder acceder a las mejores ofertas.",
    imagen: cafeteyerba, // podés usar la imagen importada aquí
  },
  {
    titulo: "Autogestioná tu pedido",
    descripcion: "Elegí los productos y las cantidades desde tu negocio o la comodidad de tu casa.",
    imagen: cafeteyerba,
  },
  {
    titulo: "Verificá tu pedido y listo",
    descripcion: "Verificá que los datos estén correctos y confirmá el pedido.",
    imagen: cafeteyerba,
  },
];

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const navigate = useNavigate();
  const correosAdmin = ["faculez07@gmail.com"];

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root.style.backgroundColor;
    root.style.backgroundColor = "white";

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        document.body.classList.remove("overflow-hidden");
        const email = currentUser.email;
        correosAdmin.includes(email) ? navigate("/admin") : navigate("/");
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

  const loginConGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const loginConEmail = async (e) => {
    e.preventDefault();
    try {
      if (esRegistro) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { photoURL: userimgdef });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const cerrarSesion = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (

    

    <section className="login-page">
      <div className="container-fluid">
        <div className="row ">
          {/* Sidebar */}
          <aside className="col-12 col-lg-3 login-sidebar bg-dark">
            <h1 className="text-white text-center mb-3 title-margin" style={{
              fontSize: "5rem", fontWeight: "900",
              textShadow: "2px 2px 0 black, 4px 4px 0 yellow",
              letterSpacing: "2px", textTransform: "uppercase"
            }}>TRIP</h1>
            <h4 className="text-center mb-4 text-white">¡Bienvenido a Trip Platform!</h4>

            <div className="text-center mb-4">
              <h5 className="text-white mb-3">¿Ya tienes cuenta?</h5>
              <button className="btn btn-warning w-100" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLogin" onClick={() => setEsRegistro(false)}>Ingresá aquí</button>
            </div>

            <div className="text-center mb-4">
              <h5 className="text-white mb-3">¿Sos nuevo?</h5>
              <button className="btn btn-light w-100" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLogin" onClick={() => setEsRegistro(true)}>¡Registrate!</button>
            </div>

            <div className="login-extra-info mt-0">
              <div className="info-item mb-3">
                <h4 className="text-white">Pedidos por App</h4>
                <p>Realizá pedidos fácil y rápido desde nuestra app.</p>
              </div>
              <div className="info-item mb-3">
                <h4 className="text-white">Take Away</h4>
                <p>Llevá tu comida favorita donde quieras.</p>
              </div>
              <div className="contact-info">
                <h5 className="fw-bold text-white">Contáctanos</h5>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://www.instagram.com/tripconcep" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                  <a href="https://wa.me/5493812024221" className="social-icon" target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp"></i></a>
                </div>
              </div>
            </div>
          </aside>

{/* Main content */}
<div className="maincont col-12 col-lg-9">
  {/* ¿Cómo funciona? */}
  <article className="bg-white p-3 como-funciona-articulo">
    <h1 className="comofunciona como-funciona-titulo">¿Cómo funciona?</h1>
  </article>

{/* Tarjetas en columna */}
{/* Contenedor con fila de tarjetas */}

<div className="container">
  <div className="row g-4 justify-content-center align-items-stretch">
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




  {/* Tarjeta puntos */}
  <div className="row justify-content-center my-5">
    <div className="col-12 col-md-8">
      <div className="info-card text-white bg-primary p-2 rounded-4 shadow-sm">
        <h3 className="text-center mb-3">¡Gana puntos por cada pedido!</h3>
        <p className="fs-6 text-center">Cada compra suma puntos que podés canjear por descuentos y regalos.</p>
        <div className="text-center mt-4">
          <button className="btn btn-light">Ver más</button>
        </div>
      </div>
    </div>
  </div>

  {/* Banner */}
  <div className="my-5">
    <BannerCard altText="Promo banner grande" large={true} />
  </div>
</div>

        </div>
      </div>

      {/* Offcanvas */}
      <div className="offcanvas offcanvas-start text-white bg-dark" id="offcanvasLogin" tabIndex="-1">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title">{esRegistro ? "Registrarse" : "Iniciar sesión"}</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"/>
        </div>
        <div className="offcanvas-body">
          {user ? (
            <div className="text-center">
              <img src={user.photoURL||userimgdef} alt="" width={80} className="rounded-circle mb-3"/>
              <h4 className="text-warning">Hola, {user.displayName||user.email}</h4>
              <button className="btn btn-danger mt-3" onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
          ) : (
            <>
              <form onSubmit={loginConEmail}>
                <input type="email" className="form-control mb-3" placeholder="Correo electrónico" value={email} onChange={e=>setEmail(e.target.value)} required/>
                <input type="password" className="form-control mb-3" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required/>
                <button type="submit" className="btn btn-warning w-100 mb-3">{esRegistro ? "🚀 Registrarse" : "Iniciar sesión"}</button>
              </form>
              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" style={{borderColor:"white"}}/>
                <span className="px-2 text-white">o</span>
                <hr className="flex-grow-1" style={{borderColor:"white"}}/>
              </div>
              <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center" onClick={loginConGoogle}>
                <i className="bi bi-google me-2"/>Google
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
