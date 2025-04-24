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

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esRegistro, setEsRegistro] = useState(false);
  const navigate = useNavigate();
  const correosAdmin = ["faculez07@gmail.com"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        document.body.classList.remove("overflow-hidden"); // <-- ✅ LIMPIA OVERFLOW

        const email = currentUser.email;
        correosAdmin.includes(email) ? navigate("/admin") : navigate("/");
      }
    });

    const manejarOffcanvas = (e) => {
      if (e.type === "show.bs.offcanvas") {
        document.body.classList.add("overflow-hidden");
      } else if (e.type === "hidden.bs.offcanvas") {
        document.body.classList.remove("overflow-hidden");
      }
    };

    window.addEventListener("show.bs.offcanvas", manejarOffcanvas);
    window.addEventListener("hidden.bs.offcanvas", manejarOffcanvas);

    return () => {
      unsubscribe();
      window.removeEventListener("show.bs.offcanvas", manejarOffcanvas);
      window.removeEventListener("hidden.bs.offcanvas", manejarOffcanvas);
    };
  }, [navigate]);

  const loginConGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.reload(); // 🔄 Recarga la página luego del login
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
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

      window.location.reload(); // 🔄 Refresca la página luego de login/registro exitoso
    } catch (error) {
      console.error("Error en autenticación por correo:", error.message);
      alert("Error: " + error.message);
    }
  };

  const cerrarSesion = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <section className="login-page">
      {/* Panel izquierdo de login/registro */}
      <aside className="login-sidebar">
      <h1
        className="text-white text-center mb-3 title-margin"
        style={{
          fontSize: "5rem",
          fontWeight: "900",
          textShadow: "2px 2px 0 black, 4px 4px 0 yellow",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
          TRIP
        </h1>
        <h4 className="text-center mb-4 text-white">¡Bienvenido a Trip Platform!</h4>

        <div className="text-center mb-4">
          <h5 className="text-white mb-3">¿Ya tienes cuenta?</h5>
          <button
            className="btn btn-warning w-100"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLogin"
            onClick={() => setEsRegistro(false)}
          >
            Ingresá aquí
          </button>
        </div>

        <div className="text-center mb-4">
          <h5 className="text-white mb-3">¿Sos nuevo?</h5>
          <button
            className="btn btn-light w-100"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLogin"
            onClick={() => setEsRegistro(true)}
          >
            ¡Registrate!
          </button>
        </div>

        <div className="login-extra-info mt-0">
          <div className="info-item">
              <div>
                <h4 className="text-white">Pedidos a través de la App</h4>
                <p>Realizá tus pedidos de manera fácil y rápida, ¡directamente desde nuestra app!</p>
              </div>
            </div>

            <div className="info-item">

            </div>

          <div className="contact-info">
            <h5 className="fw-bold">Contactanos</h5>
            <div className="d-flex justify-content-center justify-content-center gap-3">
              <a
                href="https://www.instagram.com/tripconcep"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram" style={{ fontSize: "2rem", color: "#fff" }}></i>
              </a>
              <a
                href="https://wa.me/5493812024221?text=Hola%20Trip%20concep!%20Quisiera%20hacer%20una%20consulta."
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp" style={{ fontSize: "2rem", color: "#fff" }}></i>
              </a>
            </div>
          </div>


        </div>

        
      </aside>

      <article className=" md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto mt-4">
          <h1 className="md:text-xl font-bold mb-6">¿Cómo funciona?</h1>
        </div>
      </article>

      <main className="login-main py-4">
        
        <div className="info-container container d-flex flex-column flex-lg-row gap-4 justify-content-center">
          {/* Tarjeta 1 */}
          <div className="info-card text-white bg-dark p-4 rounded-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <img
              src="https://img.freepik.com/foto-gratis/ilustracion-inicio-sesion-contrasena-seguros-procesamiento-3d_107791-16640.jpg"
              alt="Ilustración"
              className="img-fluid rounded-3 mb-3"
              style={{ height: "220px", objectFit: "cover", width: "100%" }}
            />
            <h3 className="text-center mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Iniciá sesión
            </h3>
            <p className="fs-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Identificate usando tu correo y contraseña para comenzar tu experiencia personalizada.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="info-card text-white bg-dark p-4 rounded-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <img
              src="https://img.freepik.com/foto-gratis/ilustracion-inicio-sesion-contrasena-seguros-procesamiento-3d_107791-16640.jpg"
              alt="Ilustración"
              className="img-fluid rounded-3 mb-3"
              style={{ height: "220px", objectFit: "cover", width: "100%" }}
            />
            <h3 className="text-center mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Elegí lo que necesitás
            </h3>
            <p className="fs-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Seleccioná productos, servicios o funcionalidades según tu necesidad desde cualquier lugar, en cualquier momento.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="info-card text-white bg-dark p-4 rounded-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <img
              src="https://img.freepik.com/foto-gratis/ilustracion-inicio-sesion-contrasena-seguros-procesamiento-3d_107791-16640.jpg"
              alt="Ilustración"
              className="img-fluid rounded-3 mb-3"
              style={{ height: "220px", objectFit: "cover", width: "100%" }}
            />
            <h3 className="text-center mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Confirmá y ¡listo!
            </h3>
            <p className="fs-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Revisá los detalles y finalizá el pedido con un solo clic. Rápido, simple y seguro.
            </p>
          </div>

          

          
        </div>


      </main>

      <div className="container mt-0 mb-5 col-12" style={{backgroundColor:"white"}}>
        <BannerCard altText="Promo banner grande" large={true} />
      </div>

      <div style={{ backgroundColor: "yellow", textAlign: "center", padding: "1rem" }}>
        <h3>SECCIÓN ENTRE BANNERS</h3>
      </div>

      <div className="container mt-0 mb-5 col-12" style={{backgroundColor:"white"}}>
        <BannerCard altText="Promo banner grande" large={true} />
      </div>


      

  

      

      {/* Offcanvas para login o registro */}
      <div
        className="offcanvas offcanvas-start text-white bg-dark"
        tabIndex="-1"
        id="offcanvasLogin"
        aria-labelledby="offcanvasLoginLabel"
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 id="offcanvasLoginLabel" className="offcanvas-title">
            {esRegistro ? "Registrarse" : "Iniciar sesión"}
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {user ? (
            <div className="text-center">
              <img
                src={user.photoURL || userimgdef}
                alt={user.displayName || "Usuario"}
                width={80}
                className="rounded-circle mb-3"
              />
              <h4 className="text-warning">Hola, {user.displayName || user.email}</h4>
              <button className="btn btn-danger mt-3" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={loginConEmail}>

                <div className="text-center mt-4 mb-4">
                <h1
                  className="text-white text-center mb-3 title-margin"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "900",
                    textShadow: "2px 2px 0 black, 4px 4px 0 yellow",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                    TRIP
                  </h1>
                </div>

                <div className="mb-3">
                <h5 className="mb-3">Ingresa tu cuenta:</h5>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 mb-3">
                  {esRegistro ? "🚀 Registrarse" : "Iniciar sesión"}
                </button>
              </form>

              <div className="mb-4 d-flex align-items-center">
                <hr className="flex-grow-1" style={{ borderColor: "white" }} />
                <span className="px-2 text-white">o</span>
                <hr className="flex-grow-1" style={{ borderColor: "white" }} />
              </div>



              <button
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center shadow-sm mb-3"
                onClick={loginConGoogle}
              >
                <i className="bi bi-google me-2"></i> Iniciar sesión con Google
              </button>

              
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
