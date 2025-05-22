import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "./SwiperComponent.css";


import { Navigation, Pagination, Autoplay } from "swiper/modules";

const SwiperComponent = ({ images }) => {
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="custom-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <img src={image} alt={`Promoción ${index + 1}`} className="swiper-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
