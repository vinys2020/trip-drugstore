import React, { useState, useEffect } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importación del CSS

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
        await createUserWithEmailAndPassword(auth, email, password);
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
    <section className="login-section">
      <article className="login-card">
        <h2 className="login-title">Bienvenido a la Plataforma</h2>

        {user ? (
          <div className="text-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/80"}
              alt={user.displayName || "Usuario"}
              width={80}
              className="user-avatar"
            />
            <h4 className="user-name">
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
              <button type="submit" className="btn btn-warning w-100">
                {esRegistro ? "Registrarse" : "Iniciar sesión"}
              </button>
              <p
                onClick={() => setEsRegistro(!esRegistro)}
                className="toggle-registro"
              >
                {esRegistro
                  ? "¿Ya tienes una cuenta? Inicia sesión"
                  : "¿No tienes cuenta? Regístrate"}
              </p>
            </form>

            <hr className="my-4" />

            <button
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
              onClick={loginConGoogle}
            >
              <i className="bi bi-google me-2"></i> Iniciar sesión con Google
            </button>
          </>
        )}
      </article>

      <article className="info-card">
        <h3 className="text-center info-title">¡Bienvenido de nuevo!</h3>
        <p className="info-text">
          Inicia sesión con tu cuenta de Google o con tu correo electrónico. Si
          no tienes una cuenta, puedes crear una fácilmente desde aquí.
        </p>
      </article>
    </section>
  );
};

export default Login;
