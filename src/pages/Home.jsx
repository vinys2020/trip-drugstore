import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import HorizontalScroll2 from "../components/HorizontalScroll2"; // asegurate de la ruta correcta // Importa el componente Swiper
import HorizontalCarousel from "../components/HorizontalCarousel"; // asegurate de la ruta correcta // Importa el componente Swiper
import BannerCard from "../components/BannerCard";
import BannerCard2 from "../components/BannerCard2";

import SwiperComponent from "../components/SwiperComponent";
import HorizontalScroll from "../components/HorizontalScroll"; // asegurate de la ruta correcta // Importa el componente Swiper
import promocion1 from "../assets/portada1.png"; // Asegúrate de que estas imágenes existan
import promocion2 from "../assets/portada1.png";
import promocion3 from "../assets/portada1.png";
import promocion4 from "../assets/portada1.png";
import bebida1 from "../assets/bebida1.jpg";
import bebida2 from "../assets/bebida2.jpg";
import bebida3 from "../assets/bebida3.jpg";
import bebida4 from "../assets/bebida4.jpg";
import almacen1 from "../assets/cafeteyerba.webp";
import almacen2 from "../assets/almacen2.webp";
import almacen3 from "../assets/limpieza.webp";
import almacen4 from "../assets/descartable.webp";











const Home = () => {
  const images = [promocion1, promocion2, promocion3, promocion4]; // Array de imágenes
  const images1 = [promocion1, promocion2, promocion3]; // Array de imágenes


  return (
    <>

      <div className="swiper-container">
        <div className="swiper-section">
          <SwiperComponent images={images} />
        </div>
      </div>

    <div className="container-fluid w-100 p-0" >
      



      {/* Sección Hero */}
      <section className=" d-flex justify-content-center align-items-center text-center py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <article className="col-12 col-lg-12 mt-md-4">
              <h1 className="fw-bold display-5  text-warning">
                Bienvenido a <span className=" text-white">Trip Drugstore</span>
              </h1>
              <p className="lead mt-3 text-white">
                Tu drugstore online de confianza, con envíos rápidos y productos de calidad.
              </p>
              <Link to="/productos" className="btn custom-btn btn-lg mt-3">
                Ver Productos 🛒
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="recomendados" className="py-2">
          <div className="container">
            <article className="row">
              <div className="col-12">
                <HorizontalScroll2 />
              </div>
            </article>

          </div>
        </section>


      <div className="container mt-3 mb-3">
        {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
        <BannerCard
          altText="Promo banner grande"
          large={true} // Esto controla si es una imagen grande
        />
      </div>


        {/* Sección Servicios */}
        <section id="servicios" className="py-4">
          <div className="container-fluid w-100 mt-md-4">
            <h3 className="text-start text-white mb-0">
              Tu compra semanal 📅
              <a
                className="splinter-link dynamic__carousel-link fw-bold text-decoration-none fs-5 ms-2"
                href="https://listado.mercadolibre.com.ar/supermercado/_Container_carrousel-14-04-25#DEAL_ID=MLA1226392-1&S=landingHubsupermercadolibre&V=13&T=CarouselDynamic-home&L=VER-MAS&deal_print_id=55673f90-1a49-11f0-8170-23d8a207be82&c_tracking_id=55673f90-1a49-11f0-8170-23d8a207be82"
                target="_self"
                style={{ color: "#3483fa" }}
              >
                Ver más
              </a>
            </h3>
            <HorizontalCarousel />
          </div>

        </section>


        {/* Sección Especial Bebidas */}
        <section id="bebidas" className="mt-2">
          <div className="container mt-md-4">
            <h3 className="text-center mb-4 mb-md-4 text-white">¡Especial Bebidas! 🥂</h3>

            <div className="row g-3 justify-content-center">
              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${bebida1})`,

                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${bebida2})`,

                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${bebida3})`,

                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${bebida4})`,

                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="recomendados" className="py-4">
          <div className="container">
            <h3 className="text-center mb-0 mt-md-4 mt-3 text-white">Recomendados para vos 🛍️</h3>
            <article className="row">
              <div className="col-12">
                <HorizontalScroll />
              </div>
            </article>

            {/* Sección Especial Bebidas */}
            <div className="row g-3 justify-content-center p-2 p-md-3">
              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${almacen1})`,
                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${almacen2})`,
                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${almacen3})`,
                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>

              <div className="col-6 col-md-3">
                <article
                  className="bebida-card"
                  style={{
                    backgroundImage: `url(${almacen4})`,
                  }}
                >
                  <div className="card-body"></div>
                </article>
              </div>
            </div>
          </div>
        </section>


        <section id="servicios" className="">
          <div className="container-fluid w-100 mt-3">
            <h3 className="text-start text-white mb-0">
              Ofertas Del Dia 💣
              <a
                className="splinter-link dynamic__carousel-link fw-bold text-decoration-none fs-5 ms-2"
                href="https://listado.mercadolibre.com.ar/supermercado/_Container_carrousel-14-04-25#DEAL_ID=MLA1226392-1&S=landingHubsupermercadolibre&V=13&T=CarouselDynamic-home&L=VER-MAS&deal_print_id=55673f90-1a49-11f0-8170-23d8a207be82&c_tracking_id=55673f90-1a49-11f0-8170-23d8a207be82"
                target="_self"
                style={{ color: "#3483fa" }}
              >
                Ver más
              </a>
            </h3>
            <HorizontalCarousel />
          </div>

        </section>

        <section id="servicios" className="py-4">
          <div className="container-fluid w-100 mt-md-4 mt-0">
            <h3 className="text-start text-white mb-0">
            Snacks y Dulces 🍫
              <a
                className="splinter-link dynamic__carousel-link fw-bold text-decoration-none fs-5 ms-2"
                href="https://listado.mercadolibre.com.ar/supermercado/_Container_carrousel-14-04-25#DEAL_ID=MLA1226392-1&S=landingHubsupermercadolibre&V=13&T=CarouselDynamic-home&L=VER-MAS&deal_print_id=55673f90-1a49-11f0-8170-23d8a207be82&c_tracking_id=55673f90-1a49-11f0-8170-23d8a207be82"
                target="_self"
                style={{ color: "#3483fa" }}
              >
                Ver más
              </a>
            </h3>
            <HorizontalCarousel />
          </div>

        </section>

        <div className="container mt-3 mb-5">
        {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
        <BannerCard2
          altText="Promo banner grande"
          large={true} // Esto controla si es una imagen grande
        />
      </div>





    </div>
    </>
  );
};


export default Home;
