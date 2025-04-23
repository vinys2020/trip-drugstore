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
import "./login.css"; // Importación del CSS
import userimgdef from "../assets/userimgdef.webp"; // o .png


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
        const email = currentUser.email;
        if (correosAdmin.includes(email)) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginConGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  const loginConEmail = async (e) => {
    e.preventDefault();
    try {
      if (esRegistro) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Convertir la imagen local en una URL para Firebase
        const fotoPorDefecto = userimgdef;
        await updateProfile(user, {
          photoURL: fotoPorDefecto,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
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
    <section className="login-section container-fluid py-5">
      <div className="row justify-content-center align-items-center g-4">



        {/* Tarjeta de login */}
        <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center my-3">
          <div className="login-card p-4 shadow-lg rounded-4 text-white bg-dark ">
           <h2 className="text-center mb-4 text-white">Bienvenido a Trip Platform</h2>


            {user ? (
              <div className="text-center">
                <img
                  src={user.photoURL || "https://via.placeholder.com/80"}
                  alt={user.displayName || "Usuario"}
                  width={80}
                  className="rounded-circle mb-3"
                />
                <h4 className="text-warning">
                  Hola, {user.displayName || user.email}
                </h4>
                <button className="btn btn-danger mt-3" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={loginConEmail}>
                  <div className="mb-3">
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
                  <button type="submit" className="btn btn-warning w-100 ">
                    {esRegistro ? "🚀 Registrarse" : "Iniciar sesión"}
                  </button>
                </form>

                <p
                  className="text-center mt-3 text-warning text-decoration-underline"
                  role="button"
                  onClick={() => setEsRegistro(!esRegistro)}
                >
                  {esRegistro
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? ¡Regístrate aquí!"}
                </p>

                <hr className="my-4 border-light" />

                <button
                  className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center shadow-sm"
                  onClick={loginConGoogle}
                >
                  <i className="bi bi-google me-2"></i> Iniciar sesión con Google
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tarjeta de info */}
        <div className="col-12 col-lg-5 d-flex justify-content-center align-items-center my-3">
        <div className="info-card p-4 rounded-4 shadow bg-gradient text-white" style={{ background: "linear-gradient(135deg, #2c2b2b, #1e1e1e)" }}>
          
          {/* Imagen destacada */}
          <img 
            src="https://img.freepik.com/foto-gratis/ilustracion-inicio-sesion-contrasena-seguros-procesamiento-3d_107791-16640.jpg?t=st=1745276062~exp=1745279662~hmac=6c1f3d1ff3478f74ef0ee8434b6c3d7bbe0f3e589ab46ab2cc75f97ad0b58898&w=1380"
            alt="Viaje ilustración"
            className="img-fluid rounded-3 mb-3 shadow"
            style={{ maxHeight: "360px", objectFit: "cover", width: "100%" }}
          />

          {/* Texto informativo */}
          <h3 className="text-center mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            ¡Únete a la comunidad <b>Trip</b>! ✈️ 
          </h3>
          <p className="fs-6" style={{ fontSize: "1rem", fontFamily: "'Poppins', sans-serif" }}>
            Viajes, amigos y experiencias inolvidables te esperan.<br />
            Inicia sesión con tu cuenta de Google o correo electrónico.<br />
            <strong>¿Aún no tienes cuenta? ¡Crea la tuya ahora y empieza tu aventura con Trip!</strong>
          </p>
        </div>
      </div>


      </div>
    </section>
  );
};

export default Login;
