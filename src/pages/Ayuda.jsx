import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import FaqCuentaAcceso from '../components/FaqCuentaAcceso';
import FaqFuncionalidades from '../components/FaqFuncionalidades';
import FaqSeguridad from '../components/FaqSeguridad';

import './ayuda.css';

const PaginaAyuda = () => {
  const whatsappNumber = "5493814685931";
  const defaultMessage = encodeURIComponent("Hola, necesito ayuda con mi pedido.");

  return (
    <div className="help-page-wrapper d-flex justify-content-center px-3 px-md-4">
      <div className="help-page-content w-100" style={{ maxWidth: '900px' }}>

        <header className="help-header text-center mb-5 mt-5">
          <h1 className="fw-bold text-white">Centro de Ayuda</h1>

        </header>

        <section className="mb-4">
          <FaqCuentaAcceso />
        </section>

        <section className="mb-4">
          <FaqFuncionalidades />
        </section>

        <section className="mb-4">
          <FaqSeguridad />
        </section>

        <div className="contact-support text-center mt-5 mb-5">
          <p className="mb-3 fs-6">¿No encontraste lo que buscabas?</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success d-inline-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm"
          >
            <FaWhatsapp size={20} />
            Contactanos
          </a>
        </div>

      </div>
    </div>
  );
};

export default PaginaAyuda;
