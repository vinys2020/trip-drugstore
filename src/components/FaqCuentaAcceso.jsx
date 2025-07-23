import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import '../pages/ayuda.css';

const FaqCuentaAcceso = () => {
  const faqs = [
    {
      pregunta: "¿Cómo creo una cuenta?",
      respuesta: "Podés registrarte fácilmente desde la pantalla de inicio haciendo clic en 'Registrarse' y completando tus datos personales."
    },
    {
      pregunta: "Olvidé mi contraseña, ¿qué hago?",
      respuesta: "Para recuperar tu contraseña, por favor contactá a nuestro equipo de soporte a través del centro de ayuda o el chat de WhatsApp."
    },
    {
      pregunta: "¿Es obligatorio crear una cuenta para comprar?",
      respuesta: "No es obligatorio. Podés navegar y consultar productos sin registrarte, pero para finalizar una compra es necesario crear una cuenta."
    },
    {
      pregunta: "¿Gano puntos con mis compras?",
      respuesta: "Sí, recordá que con cada compra acumulás puntos que podés canjear por descuentos y promociones especiales."
    }
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-title text-warning"><FaQuestionCircle /> Cuenta y Acceso</h2>
      <div className="accordion" id="cuentaAccesoAccordion">
        {faqs.map((faq, index) => (
          <div className="custom-accordion-item" key={index}>
            <h2 className="accordion-header" id={`headingCuenta${index}`}>
              <button
                className={`accordion-button custom-accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseCuenta${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapseCuenta${index}`}
              >
                {faq.pregunta}
              </button>
            </h2>
            <div
              id={`collapseCuenta${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              data-bs-parent="#cuentaAccesoAccordion"
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

export default FaqCuentaAcceso;
