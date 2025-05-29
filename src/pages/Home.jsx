import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import HorizontalScroll2 from "../components/HorizontalScroll2"; // asegurate de la ruta correcta // Importa el componente Swiper
import HorizontalCarousel from "../components/HorizontalCarousel"; // asegurate de la ruta correcta // Importa el componente Swiper
import BannerCard from "../components/BannerCard";
import BannerCard2 from "../components/BannerCard2";
import BannerCard3 from "../components/BannerCard3";
import VerticalCarousel from "../components/VerticalCarousel";
import SwiperComponent from "../components/SwiperComponent";
import HorizontalScroll from "../components/HorizontalScroll"; // asegurate de la ruta correcta // Importa el componente Swiper
import promocion1 from "../assets/coca.webp"; // Asegúrate de que estas imágenes existan
import promocion2 from "../assets/portada22.webp";
import promocion3 from "../assets/cofler.webp";
import promocion4 from "../assets/galletitas.webp";
import promocion1Mobile from "../assets/promo22celu.webp";
import promocion2Mobile from "../assets/promogalletacelu.webp";
import promocion3Mobile from "../assets/promocoflcelu.webp";
import promocion4Mobile from "../assets/promococacelu.webp";
import bebida1 from "../assets/bebida1.jpg";
import bebida2 from "../assets/bebida2.jpg";
import bebida3 from "../assets/bebida3.jpg";
import bebida4 from "../assets/bebida4.jpg";
import almacen1 from "../assets/cafeteyerba.webp";
import almacen2 from "../assets/almacen2.webp";
import almacen3 from "../assets/limpieza.webp";
import almacen4 from "../assets/descartable.webp";




const Home = () => {
  const isMobile = window.innerWidth <= 768;

  const images = isMobile
    ? [promocion1Mobile, promocion2Mobile, promocion3Mobile, promocion4Mobile]
    : [promocion1, promocion2, promocion3, promocion4];

  return (
    <>

      <div className="swiper-container">
        <div className="swiper-section  mt-0">
          <SwiperComponent images={images} />
        </div>
      </div>

     <div className="container-fluid w-100 p-0 app-scroll-container" >
      



      {/* Sección Hero */}
      <section className=" d-flex justify-content-center align-items-center text-center mt-0 mb-4 mb-lg-4 mt-lg-3">
        <div className="container ">
          <div className="row justify-content-center">
            <article className="col-12 col-lg-12 mt-lg-4 mt-4">
              <h1 className="fw-bold display-5  text-warning">
                Bienvenido a <span className=" text-white">Trip Drugstore</span>
              </h1>
              <p className="lead mt-3 text-white">
                Tu drugstore online de confianza, con envíos rápidos y productos de calidad.
              </p>
              <Link
  to="/categorias/Snacksygalletitasid"
  className="btn custom-btn btn-lg mt-3 mb-lg-5 mb-2"
>
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


      <div className="mt-3 mb-3 mx-lg-5 mx-2">
        {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
        <BannerCard
          altText="Promo banner grande"
          large={true} // Esto controla si es una imagen grande
        />
      </div>



        {/* Sección Especial Bebidas */}
        <section id="bebidas" className="mt-5">
          <div className="container mt-md-4">
            <h3 className="text-center mb-4 mb-lg-4 text-white">¡Especial Bebidas! 🥂</h3>
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

        <section id="recomendados" className="py-4 ">
          <div className="container">
            <h3 className="text-center mt-md-4 mt-3 text-white mb-3">Recomendados para vos 🛍️</h3>
            <article className="row">
              <div className="container">
                <div className="col-12 mb-3">
                  <HorizontalScroll />
                </div>
              </div>
            </article>


            {/* Sección Especial Bebidas */}
            <div className="row g-3 justify-content-center  p-md-3">
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


        <section id="servicios" className="mx-lg-5">
        <div className="container-fluid w-100 mt-3">

          {/* Contenedor para el HorizontalCarousel */}
          <div className="container px-0">
            <HorizontalCarousel />
          </div>
        </div>

        </section>

        <section id="servicios" className="py-md-4 mx-lg-5">
          <div className="container-fluid w-100 mt-md-4 mt-2">
            <div className="container px-0">
              <HorizontalCarousel />
            </div>          
          </div>
        </section>

        <div className="mt-3 mb-5 mx-lg-5 mx-2">
          {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
          <BannerCard2
            altText="Promo banner grande"
            large={true} // Esto controla si es una imagen grande
          />
        </div>

        <section id="servicios" className="mb-md-2 mt-md-0 mb-4 mx-lg-5">
          <div className="container-fluid w-100 mt-md-4 mt-0">

            <VerticalCarousel />

          </div>

        </section>

        <div className="mt-5 mb-5 mx-lg-5 mx-2">
          {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
          <BannerCard3
            altText="Promo banner grande"
            large={true} // Esto controla si es una imagen grande
          />
        </div>

        <section id="servicios" className="mb-md-2 mt-md-0 mb-4 ms-md-3 mx-md-2 mx-lg-5">
          <div className="container-fluid w-100 mt-md-4">
            <VerticalCarousel />

          </div>

        </section>

        <div className="mt-5 mb-5 mx-lg-5 mx-2">
          {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
          <BannerCard3
            altText="Promo banner grande"
            large={true} // Esto controla si es una imagen grande
          />
        </div>

        <section id="servicios" className="mt-md-0 mb-4 ms-md-3 mx-md-2 mb-5 mx-lg-5">
        <div className="container-fluid w-100 mt-md-4 mt-0">

          <VerticalCarousel />

          </div>

        </section>

        <div className="mt-5 mb-5 mx-lg-5 mx-2">
          {/* Usamos BannerCard con la imagen de escritorio y la de móvil */}
          <BannerCard3
            altText="Promo banner grande"
            large={true} // Esto controla si es una imagen grande
          />
        </div>


    </div>
    </>
  );
};


export default Home;
