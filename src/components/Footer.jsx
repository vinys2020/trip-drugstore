import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Archivo de estilos opcional

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 w-100">
      <div className="container">
        <div className="row">
          {/* Logo y descripción */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h4 className="fw-bold">Trip Drugstore</h4>
            <p className="text-white">Tu Drugstore de confianza con productos frescos y ofertas increíbles.</p>
          </div>

            {/* Enlaces rápidos */}
            <div className="col-md-4 text-center mb-3 mb-md-0">
            <h5 className="fw-bold text">Enlaces</h5>
            <ul className="list-unstyled d-flex justify-content-center flex-wrap">
                <li className="mx-2"><a href="/productos" className="footer-link">Productos</a></li>
                <li className="mx-2"><a href="/ofertas" className="footer-link">Ofertas</a></li>
                <li className="mx-2"><a href="/contacto" className="footer-link">Contacto</a></li>
                <li className="mx-2"><a href="/nosotros" className="footer-link">Nosotros</a></li>
            </ul>
            </div>

          {/* Redes sociales */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="fw-bold">Síguenos</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="https://instagram.com" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="https://twitter.com" className="social-icon"><i className="bi bi-twitter"></i></a>
              <a href="https://youtube.com" className="social-icon"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-3 text-white" />

        {/* Copyright */}
        <div className="text-center">
            <p class="mb-0">© 2025 Trip Drugstore - Página creada por <a href="https://www.instagram.com/publik.tuc/" class="text-link text-decoration-underline" target="_blank">Publik</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
