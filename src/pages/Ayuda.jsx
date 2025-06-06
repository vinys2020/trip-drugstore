import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';  // corregí importación del ícono
import FaqCuentaAcceso from '../components/FaqCuentaAcceso';
import FaqFuncionalidades from '../components/FaqFuncionalidades';
import FaqSeguridad from '../components/FaqSeguridad';

import "./ayuda.css";

const PaginaAyuda = () => {
  const whatsappNumber = "5493814685931"; // poné tu número con código país y sin signos
  const defaultMessage = encodeURIComponent("Hola, necesito ayuda con mi pedido."); // mensaje predeterminado


  return (
    <div className="help-page mt-md-4">
      {/* Header */}
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra respuestas rápidas a tus preguntas o contáctanos si necesitas asistencia adicional.</p>
      </header>

      {/* Sección: Cuenta y Acceso */}
      <FaqCuentaAcceso />

      {/* Sección: Funcionalidades */}
      <FaqFuncionalidades />

      {/* Sección: Seguridad */}
      <FaqSeguridad />

      {/* Footer */}
      <div className="contact-support">
        <p>¿No encontraste lo que buscabas?</p>
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-whatsapp"
        >
          <FaWhatsapp style={{ marginRight: '8px' }} />
          Contactanos
        </a>
      </div>
    </div>
  );
};

export default PaginaAyuda;
