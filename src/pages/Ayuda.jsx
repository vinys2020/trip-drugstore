import React from 'react';
import { FaSearch, FaQuestionCircle, FaEnvelopeOpenText } from 'react-icons/fa';
import "./ayuda.css";

const PaginaAyuda = () => {
  return (
    <div className="help-page mt-md-4">
      {/* Header */}
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra respuestas rápidas a tus preguntas o contáctanos si necesitas asistencia adicional.</p>
      </header>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Buscar en la ayuda..." />
        <FaSearch />
      </div>

      {/* Sección: Cuenta y Acceso */}
      <section className="faq-section">
        <h2><FaQuestionCircle /> Cuenta y Acceso</h2>
        <ul >
          <li>¿Cómo creo una cuenta?</li>
          <li>Olvidé mi contraseña, ¿qué hago?</li>
          <li>¿Puedo cambiar mi correo electrónico?</li>
        </ul>
      </section>

      {/* Sección: Funcionalidades */}
      <section className="faq-section">
        <h2><FaQuestionCircle /> Funcionalidades</h2>
        <ul>
          <li>¿Cómo uso la plataforma?</li>
          <li>¿Dónde encuentro mis estadísticas?</li>
          <li>¿Puedo cambiar mi imagen de perfil?</li>
        </ul>
      </section>

      {/* Sección: Seguridad */}
      <section className="faq-section">
        <h2><FaQuestionCircle /> Seguridad</h2>
        <ul>
          <li>¿Mi información está segura?</li>
          <li>¿Cómo reporto un problema?</li>
          <li>¿Qué hago si detecto actividad sospechosa?</li>
        </ul>
      </section>

      {/* Footer */}
      <div className="contact-support">
        <p>¿No encontraste lo que buscabas?</p>
        <a href="mailto:soporte@tuapp.com">
          <FaEnvelopeOpenText /> Contactar Soporte
        </a>
      </div>
    </div>
  );
};

export default PaginaAyuda;
