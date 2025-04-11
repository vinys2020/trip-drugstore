import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import SwiperComponent from "../components/SwiperComponent"; // Importa el componente Swiper
import promocion1 from "../assets/portada1.png"; // Asegúrate de que estas imágenes existan
import promocion2 from "../assets/portada1.png";
import promocion3 from "../assets/portada1.png";
import promocion4 from "../assets/portada1.png";
import bebida1 from "../assets/bebida1.jpg";
import bebida2 from "../assets/bebida2.jpg";
import bebida3 from "../assets/bebida3.jpg";
import bebida4 from "../assets/bebida4.jpg";




import Carousel from '../components/Carousel'; // Importamos el componente Carousel




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
      <section className=" d-flex justify-content-center align-items-center text-center py-5 mb-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <article className="col-12 col-lg-12">
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

      <Carousel />




        {/* Sección Servicios */}
        <section id="servicios" className="py-5">
          <div className="container-fluid w-100 p-3">
            <h2 className="text-center mb-4 text-white">☀️ VERANO EN TRIP ☀️</h2>
            <div className="row">
              {/* Tarjeta de Servicio 1 */}
              <article className="col-4 col-md-6 col-lg-4  d-flex justify-content-center align-items-center p-1">
                <div className="card shadow-sm w-100 p-0">
                  <div 
                    className="card-body w-100"
                    style={{
                      backgroundImage: `url(${promocion4})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px", // Ajusta la altura según sea necesario
                      width: "100%",
                    }}
                  >
                  </div>
                </div>
              </article>

              {/* Tarjeta de Servicio 2 */}
              <article className="col-4 col-md-6 col-lg-4  d-flex justify-content-center align-items-center p-1">
                <div className="card shadow-sm w-100">
                  <div 
                    className="card-body w-100"
                    style={{
                      backgroundImage: `url(${promocion4})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px", // Ajusta la altura según sea necesario
                      width: "100%" // Asegura que el contenedor no se encoja
                    }}
                  >
                  </div>
                </div>
              </article>


              {/* Tarjeta de Servicio 3 */}
              <article className="col-4 col-md-6 col-lg-4  d-flex justify-content-center align-items-center p-1">
                <div className="card shadow-sm w-100">
                  <div 
                    className="card-body w-100"
                    style={{
                      backgroundImage: `url(${promocion4})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px", // Ajusta la altura según sea necesario
                      width: "100%" // Asegura que el contenedor no se encoja
                    }}
                  >
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Sección Especial Bebidas */}
        <section id="bebidas" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4 text-white">¡ESPECIAL BEBIDAS! 🥂</h2>

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



    </div>
    </>
  );
};


export default Home;
