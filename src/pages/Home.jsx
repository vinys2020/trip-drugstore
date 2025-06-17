import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import HorizontalScroll2 from "../components/HorizontalScroll2";
import HorizontalCarousel from "../components/HorizontalCarousel";
import HorizontalChoc from "../components/HorizontalChoc";
import HorizontalGolos from "../components/HorizontalGolos";
import HorizontalAlms from "../components/HorizontalAlms";
import HorizontalBeb from "../components/HorizontalBeb"; 
import Horizontalots from "../components/Horizontalots";
import Horizontalcig from "../components/Horizontalcig";
import BannerCard3 from "../components/BannerCard3";
import BannerCard4 from "../components/Baner4";
import BannerCard5 from "../components/Banner5";
import BannerCard6 from "../components/Banner6cafetrip";
import BannerCard7 from "../components/Banner7cho";
import BannerCard8 from "../components/Banner8dep";
import VerticalCarousel from "../components/VerticalCarousel";
import VerticalCarouselPers from "../components/VerticalCarouselPers";
import SwiperComponent from "../components/SwiperComponent";
import HorizontalScroll from "../components/HorizontalScroll";
import promocion1 from "../assets/coca.webp";
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
import almacen1 from "../assets/snakpost.webp";
import almacen2 from "../assets/tripsposts.webp";
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


        <section className=" d-flex justify-content-center align-items-center text-center mt-0 mb-4 mb-lg-4 mt-lg-3">
          <div className="container ">
            <div className="row justify-content-center">
              <article className="col-12 col-lg-12 mt-lg-4 mt-4">
                <h1 className="fw-bold display-5  text-warning">
                  Bienvenido a <span className=" text-white">Trip Drugstore</span>
                </h1>
                <p className="lead mt-3 text-white">
                  Ganá tiempo comprando online, Hacé tu pedido y retiralo listo al instante.</p>
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



        <section id="servicios" className="mx-lg-5">
          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <HorizontalAlms />
            </div>
          </div>

        </section>

        <div className="mt-2 mx-lg-5">
          <BannerCard8
            altText="Promo banner grande"
            large={true}
          />
        </div>

        <section id="bebidas" className="mt-5">
          <div className="container mt-md-4">
            <h3 className="text-center mb-4 mb-lg-4 text-white">¡Especial Bebidas! 🥂</h3>
            <div className="row g-3 justify-content-center">
              <div className="col-6 col-md-3">
                <Link to="/categorias/Bebidasid?search=cerveza">
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${bebida1})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to={{
                    pathname: "/categorias/Bebidasid",
                    search: "?alcohol=con",
                  }}
                >
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${bebida2})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to={{
                    pathname: "/categorias/Bebidasid",
                    search: "?alcohol=con",
                  }}
                >
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${bebida3})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link
                  to={{
                    pathname: "/categorias/Bebidasid",
                    search: "?alcohol=sin",
                  }}
                >
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${bebida4})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-lg-5">
          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <HorizontalBeb />
            </div>
          </div>

        </section>



        <div className="mt-2 mb-5">
          <BannerCard6
            altText="Promo banner grande"
            large={true}
          />
        </div>


        <section id="servicios" className="mb-md-2 mt-lg-5 mb-4 mx-lg-5 mt-3">
          <div className="w-100 mt-md-4 mt-0">

            <VerticalCarousel />

          </div>

        </section>

        <div className="mt-5 mb-5 mx-lg-5">
          <BannerCard7
            altText="Promo banner grande"
            large={true}
          />
        </div>

        <section id="servicios" className="py-0 mx-lg-5 mb-2">
          <div className="container-fluid w-100 mt-md-4 mt-2">
            <div className="container px-0">
              <HorizontalChoc />
            </div>
          </div>
        </section>

        <div className="mt-0 mb-4">
          <BannerCard5
            altText="Promo banner grande"
            large={true} 
          />
        </div>

        <section id="servicios" className="mx-lg-5 mb-0 mt-lg-5">
          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <HorizontalGolos />
            </div>
          </div>

        </section>


        <div className="mt-4 mb-5 mx-lg-5">
          <BannerCard4
            altText="Promo banner grande"
            large={true}
          />
        </div>

        <section id="recomendados" className="py-lg-0 mb-5 mb-lg-5">
          <div className="container">
            <h3 className="text-center mt-md-4 mt-3 text-white mb-lg-4 mb-3">Recomendados para vos 🛍️</h3>
            <article className="row">
              <div className="container">
                <div className="col-12 mb-3">
                  <HorizontalScroll />
                </div>
              </div>
            </article>


            <div className="row g-3 justify-content-center p-md-3">
              <div className="col-6 col-md-3">
                <Link to="/categorias/Snacksygalletitasid">
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${almacen1})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link to="/categorias/Tripcafeysandwichesid">
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${almacen2})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link to="/categorias/Articuloslimpiezaid">
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${almacen3})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>

              <div className="col-6 col-md-3">
                <Link to="/categorias/Cuidadopersonalid">
                  <article
                    className="bebida-card"
                    style={{
                      backgroundImage: `url(${almacen4})`,
                    }}
                  >
                    <div className="card-body"></div>
                  </article>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="justify-content-center p-0 mb-5 mt-5 mt-lg-5">
          <div className="col-12 container">
            <div className="info-card text-white bg-primary p-4 rounded-4 shadow-sm text-center">
              <i className="bi bi-trophy" style={{ fontSize: "3rem", color: "gold" }}></i>
              <h4 className="text-center">¡Gana puntos por cada pedido!</h4>
              <p className="fs-6 text-center">Sumá puntos con cada compra y canjealos en tu perfil por cupones con increíbles regalos y excelentes descuentos.</p>
            </div>
          </div>
        </div>


        <section id="servicios" className="mx-lg-5">
          <div className="container-fluid w-100 mt-3">
            <div className="container px-0">
              <HorizontalCarousel />
            </div>
          </div>

        </section>

        <section id="servicios" className="mb-md-2 mt-md-0  mb-4 ms-md-3 mx-md-2 mx-lg-5">

          <div className=" w-100 mt-md-4">
            <VerticalCarouselPers />
          </div>

        </section>

        <div className="mt-5 mb-5 mx-lg-5">
          <BannerCard3
            altText="Promo banner grande"
            large={true} 
          />
        </div>

        <section id="servicios" className="mx-lg-5">
          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <Horizontalots />
            </div>
          </div>

        </section>



        <section id="servicios" className="mx-lg-5">
          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <Horizontalcig />
            </div>
          </div>

        </section>

      </div>
    </>
  );
};


export default Home;
