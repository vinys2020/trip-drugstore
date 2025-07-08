import React, { useState, useEffect, useRef, useMemo } from "react";
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
import bebida1 from "../assets/bebida1.jpg";
import bebida2 from "../assets/bebida2.jpg";
import bebida3 from "../assets/bebida3.jpg";
import bebida4 from "../assets/bebida4.jpg";
import almacen1 from "../assets/snakpost.webp";
import almacen2 from "../assets/tripsposts.webp";
import almacen3 from "../assets/limpieza.webp";
import almacen4 from "../assets/descartable.webp";
import useInView from "../hooks/useInView"; // ajustá el path si es necesario

const defaultInViewOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const useSectionInView = (options = {}) => {
  const mergedOptions = useMemo(() => ({ ...defaultInViewOptions, ...options }), [options]);
  return useInView(mergedOptions);
};


const Home = () => {
  const [loaded, setLoaded] = useState(false);

  const [refServicios, serviciosInView] = useSectionInView();
  const [refServiciosGolos, serviciosGolosInView] = useSectionInView();
  const [refPuntosBanner, puntosBannerInView] = useSectionInView();
  const [refRecomendados, recomendadosInView] = useSectionInView();
  const [refBebidas, bebidasInView] = useSectionInView();
  const [refBannerChocolate, bannerChocolateInView] = useSectionInView();
  const [refBannerGalletas, bannerGalletasInView] = useSectionInView();
  const [refBannerPowerade, bannerPoweradeInView] = useSectionInView();
  const [refAlmacenSection, almacenSectionInView] = useSectionInView();
  const [refBannerCafeTrip, bannerCafeTripInView] = useSectionInView();
  const [refVerticalCarousel, verticalCarouselInView] = useSectionInView();
  const [refBannerCard3, bannerCard3InView] = useSectionInView();
  const [refArticulosLimpieza, articulosLimpiezaInView] = useSectionInView();
  const [refVerticalCuidadPersonal, verticalCuidadPersonalInView] = useSectionInView();
  const [refBannerRegalo, bannerRegaloInView] = useSectionInView();
  const [refOtrosCarru, otrosCarruInView] = useSectionInView();
  const [refCarruCig, carruCigInView] = useSectionInView();


  useEffect(() => {
    // Simular carga (por ejemplo al montar componente)
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      <div className="swiper-container">
        <div className="swiper-section  mt-0">
          <SwiperComponent />
        </div>
      </div>

      <div className="container-fluid w-100 p-0 app-scroll-container" >


        <section className=" d-flex justify-content-center align-items-center text-center mt-0 mb-4 mb-lg-4 p-lg-4">
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
                  className="btn custom-btn btn-lg mt-3 mb-lg-2 mb-2"
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

        <div
          ref={refPuntosBanner}
          className={`justify-content-center p-0 mb-5 mt-5 mt-lg-5 slide-up ${puntosBannerInView ? "loaded" : ""}`}
        >          <div className="col-12 container">
            <div className="info-card text-white bg-primary p-4 rounded-4 shadow-sm text-center">
              <i className="bi bi-trophy" style={{ fontSize: "3rem", color: "gold" }}></i>
              <h4 className="text-center">¡Gana puntos por cada pedido!</h4>
              <p className="fs-6 text-center">Sumá puntos con cada compra y canjealos en tu perfil por cupones con increíbles regalos y excelentes descuentos.</p>
            </div>
          </div>
        </div>



        <section
          ref={refRecomendados}
          className={`py-lg-0 mb-5 mb-lg-5 slide-up ${recomendadosInView ? "loaded" : ""}`}
        >          <div className="container">
            <h3 className="text-center mt-md-4 mt-3 text-white mb-lg-4 mb-3">Recomendados para vos</h3>
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



        <div
          ref={refBannerRegalo}
          className={`justify-content-center p-0 mb-5 mt-5 mt-lg-5 slide-up ${bannerRegaloInView ? "loaded" : ""}`}
        ><div className="col-12 container">
            <div className="info-card text-white bg-primary p-4 rounded-4 shadow-sm text-center">
              <i className="bi bi-gift" style={{ fontSize: "3rem", color: "lightgreen" }}></i>
              <h4 className="text-center">¡Canjea tus puntos por increíbles descuentos!</h4>
              <p className="fs-6 text-center">No dejes pasar las oportunidad de obtener descuentos especiales solo para usuarios fieles. Revisa tu perfil y comienza a canjear tus cupones.</p>
            </div>
          </div>
        </div>


        <div
          ref={refBannerChocolate}
          className={`justify-content-center p-0 mb-5 mt-5 mt-lg-5 slide-up ${bannerChocolateInView ? "loaded" : ""}`}
        >
          <BannerCard7 altText="Promo banner grande de chocolate" large={true} />
        </div>

        <section
          ref={refServicios}
          className={`py-0 mx-lg-5 mb-2 slide-up ${serviciosInView ? "loaded" : ""}`}
        >       <div className="container-fluid w-100 mt-md-4 mt-2">
            <div className="container px-0">
              <HorizontalChoc />
            </div>
          </div>
        </section>
        <div
          ref={refBannerGalletas}
          className={`mt-0 mb-4 slide-up ${bannerGalletasInView ? "loaded" : ""}`}
        >
          <BannerCard5
            altText="Promo banner grande"
            large={true}
          />
        </div>


        <section
          ref={refServiciosGolos}
          className={`mx-lg-5 mb-0 mt-lg-5 slide-up ${serviciosGolosInView ? "loaded" : ""}`}
        >       <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <HorizontalGolos />
            </div>
          </div>

        </section>


        <section
          id="bebidas"
          ref={refBebidas}
          className={`mt-5 slide-up ${bebidasInView ? "loaded" : ""}`}
        ><div className="container mt-md-4">
            <h3 className="text-center mb-4 mb-lg-4 text-white">¡Especial Bebidas!</h3>
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

          <section id="servicios" className="mx-lg-5">
            <div className="container-fluid w-100 mt-3">

              <div className="container px-0">
                <HorizontalBeb />
              </div>
            </div>

          </section>
        </section>


        <div
          ref={refBannerPowerade}
          className={`mt-2 mx-lg-5 slide-up mb- ${bannerPoweradeInView ? "loaded" : ""}`}
        >
          <BannerCard8
            altText="Promo banner grande"
            large={true}
          />
        </div>



        <section
          id="almacen"
          ref={refAlmacenSection}
          className={`mx-lg-5 slide-up ${almacenSectionInView ? "loaded" : ""}`}
        >
          <div className="container-fluid w-100 mt-3">
            <div className="container px-0">
              <HorizontalAlms />
            </div>
          </div>
        </section>




        <div
          ref={refBannerCafeTrip}
          className={`mt-2 mb-5 slide-up ${bannerCafeTripInView ? "loaded" : ""}`}
        >
          <BannerCard6
            altText="Promo banner grande"
            large={true}
          />
        </div>


        <section
          ref={refVerticalCarousel}
          className={`mb-md-2 mt-lg-5 mb-4 mx-lg-5 mt-3 slide-up ${verticalCarouselInView ? "loaded" : ""}`}
        >
          <div className="w-100 mt-md-4 mt-0">
            <VerticalCarousel />
          </div>
        </section>

        <div
          className="mt-4 mb-5 mx-lg-5"
        ><BannerCard4
            altText="Promo banner grande"
            large={true}
          />
        </div>


        <div
          ref={refBannerCard3}
          className={`mt-5 mb-5 mx-lg-5 slide-up ${bannerCard3InView ? "loaded" : ""}`}
        >
          <BannerCard3
            altText="Promo banner grande"
            large={true}
          />
        </div>

        <section
          ref={refArticulosLimpieza}
          className={`mx-lg-5 slide-up ${articulosLimpiezaInView ? "loaded" : ""}`}
        >
          <div className="container-fluid w-100 mt-3">
            <div className="container px-0">
              <HorizontalCarousel />
            </div>
          </div>
        </section>

        <section
          ref={refVerticalCuidadPersonal}
          className={`mb-md-2 mt-md-0 mb-4 ms-md-3 mx-md-2 mx-lg-5 slide-up ${verticalCuidadPersonalInView ? "loaded" : ""}`}
        >
          <div className="w-100 mt-md-4">
            <VerticalCarouselPers />
          </div>
        </section>




        <section
          ref={refOtrosCarru}
          className={`mx-lg-5 slide-up ${otrosCarruInView ? "loaded" : ""}`}
        >          <div className="container-fluid w-100 mt-3">

            <div className="container px-0">
              <Horizontalots />
            </div>
          </div>

        </section>



        <section
          ref={refCarruCig}
          className={`mx-lg-5 mb-5 slide-up ${carruCigInView ? "loaded" : ""}`}
        >          <div className="container-fluid w-100 mt-3">

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
