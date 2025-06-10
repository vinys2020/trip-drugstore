import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PreguntasFrecuentes.css'; // Asegúrate de que la ruta sea correcta





// components/PreguntasFrecuentes.jsx
const PreguntasFrecuentes = () => {
  // Definir las preguntas y respuestas en un array para mejor mantenimiento
  const faqs = [
    {
      pregunta: "¿Cómo realizo un pedido?",
      respuesta: "Podés hacer tu pedido fácilmente desde nuestra página web. Armá tu carrito, confirmá la compra y nosotros lo preparamos para que lo retires."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos todos los métodos de pago habituales: efectivo, tarjetas de débito y crédito, y billeteras virtuales."
    },
    {
      pregunta: "¿Realizan envíos a domicilio?",
      respuesta: "Por el momento no realizamos envíos, pero estamos trabajando para ofrecer este servicio muy pronto."
    },
    {
      pregunta: "¿Puedo modificar mi pedido luego de confirmarlo?",
      respuesta: "Sí, si tu pedido aún no fue preparado, podés modificarlo desde el carrito. Si ya está listo, contactanos y veremos cómo ayudarte."
    },
    {
      pregunta: "¿Cómo puedo saber el estado de mi pedido?",
      respuesta: "Podés consultar el estado de tu pedido desde tu perfil. Además, te enviaremos una notificación cuando esté listo para retirar."
    }
  ];

  return (
    <div className="faq-section bg-light rounded-2 shadow-sm  py-5 px-3">
      <h3 className="text-center mb-4">Preguntas Frecuentes</h3>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`faq${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                {faq.pregunta}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                {faq.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
