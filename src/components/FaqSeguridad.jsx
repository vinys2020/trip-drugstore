import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import '../pages/ayuda.css';

const FaqSeguridad = () => {
  const faqs = [
    {
      pregunta: "¿Mi información está segura?",
      respuesta: "Sí. Utilizamos tecnología de Google para la autenticación y protección de cuentas, junto con protocolos de seguridad avanzados como encriptación de datos y monitoreo continuo para garantizar la seguridad de tu información."
    },
    {
      pregunta: "¿La plataforma guarda los datos de mi tarjeta?",
      respuesta: "No, por tu seguridad no almacenamos información sensible como los datos de tu tarjeta. El pago se realiza directamente al momento de la entrega de tu pedido, lo que garantiza una experiencia segura."
    },
    {
      pregunta: "¿Mi sesión se cierra automáticamente?",
      respuesta: "Sí, por seguridad tu sesión puede cerrarse automáticamente después de un período de inactividad prolongado. Esto ayuda a proteger tu cuenta si olvidás cerrar sesión."
    }
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-title text-warning"><FaQuestionCircle /> Seguridad</h2>
      <div className="accordion" id="seguridadAccordion">
        {faqs.map((faq, index) => (
          <div className="custom-accordion-item" key={index}>
            <h2 className="accordion-header" id={`headingSeguridad${index}`}>
              <button
                className={`accordion-button custom-accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseSeguridad${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapseSeguridad${index}`}
              >
                {faq.pregunta}
              </button>
            </h2>
            <div
              id={`collapseSeguridad${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              data-bs-parent="#seguridadAccordion"
            >
              <div className="accordion-body custom-accordion-body mb-2 mx-2">
                {faq.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSeguridad;
