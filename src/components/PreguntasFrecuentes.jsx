import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PreguntasFrecuentes.css'; // Asegúrate de que la ruta sea correcta





// components/PreguntasFrecuentes.jsx
const PreguntasFrecuentes = () => {
    // Definir las preguntas y respuestas en un array para mejor mantenimiento
    const faqs = [
      {
        pregunta: "¿Cómo hago un pedido?",
        respuesta: "Podés hacer tu pedido desde nuestra página web o en nuestro local."
      },
      {
        pregunta: "¿Cuáles son los métodos de pago disponibles?",
        respuesta: "Aceptamos todo los metodos pagos."
      },
      {
        pregunta: "¿El envío es gratuito?",
        respuesta: "El envío es gratuito para compras superiores a $5.000."
      },
      {
        pregunta: "¿Puedo cambiar mi pedido?",
        respuesta: "Si tu pedido aún no fue enviado, podés modificarlo desde el carrito. Si ya fue enviado, contactanos para ayudarte."
      },
      {
        pregunta: "¿Cómo saber el estado de mi pedido?",
        respuesta: "Recibirás un correo con el seguimiento y el estado de tu pedido."
      }
    ];
  
    return (
      <div className="faq-section bg-light rounded-2 shadow-sm py-5 px-3">
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
  