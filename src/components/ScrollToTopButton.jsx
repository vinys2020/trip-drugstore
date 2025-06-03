import React, { useEffect, useState } from "react";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      // Mostrar botón cuando estés a 300px del final de la página
      if (scrollPosition > pageHeight - 700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = "5491234567890"; // Cambia por tu número (código país sin + ni espacios)
    const message = encodeURIComponent(
      "Hola, quisiera saber cómo puedo realizar mi pedido por WhatsApp."
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return showButton ? (
    <button
      onClick={openWhatsApp}
      className="scroll-to-whatsapp-button"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <i className="bi bi-whatsapp" style={{ fontSize: "28px", color: "white" }}></i>
    </button>
  ) : null;
};

export default ScrollToTopButton;
