import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import FaqCuentaAcceso from '../components/FaqCuentaAcceso';
import FaqFuncionalidades from '../components/FaqFuncionalidades';
import FaqSeguridad from '../components/FaqSeguridad';

import "./ayuda.css";

const PaginaAyuda = () => {
  const whatsappNumber = "5493814685931";
  const defaultMessage = encodeURIComponent("Hola, necesito ayuda con mi pedido.");


  return (
    <div className="help-page mt-md-4">

      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra respuestas rápidas a tus preguntas o contáctanos si necesitas asistencia adicional.</p>
      </header>

      <FaqCuentaAcceso />

      <FaqFuncionalidades />

      <FaqSeguridad />

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
