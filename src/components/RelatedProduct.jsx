import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RelatedCard from "./RelatedCard";

const RelatedProduct = ({ products, loading }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (loading) {
    return (
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = ".custom-prev";
          swiper.params.navigation.nextEl = ".custom-next";
        }}
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="related-swiper relative"
      >
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-xl shadow-md p-4 space-y-4 animate-pulse">
                <div className="h-40 bg-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </SwiperSlide>
          ))}

        {/* أزرار مخصصة */}
        <button
          className={`custom-prev absolute -left-6 top-1/2 z-10 bg-white p-2 rounded-full shadow-md -translate-y-1/2 ${
            isBeginning ? "opacity-40 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={isBeginning}
        >
          <FaChevronLeft className="w-5 h-5 text-green-600" />
        </button>
        <button
          className={`custom-next absolute -right-6 top-1/2 z-10 bg-white p-2 rounded-full shadow-md -translate-y-1/2 ${
            isEnd ? "opacity-40 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={isEnd}
        >
          <FaChevronRight className="w-5 h-5 text-green-600" />
        </button>
      </Swiper>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-gray-500">No related products found.</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = ".custom-prev";
        swiper.params.navigation.nextEl = ".custom-next";
      }}
      onSlideChange={handleSlideChange}
      onSwiper={handleSlideChange}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
      className="related-swiper relative"
    >
      {products.map((item) => (
        <SwiperSlide key={item.id}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer"
          >
            <RelatedCard item={item} />
          </motion.div>
        </SwiperSlide>
      ))}

      {/* أزرار مخصصة */}
      <button
        className={`custom-prev absolute left-3 top-1/2 z-10 bg-white p-2 rounded-full shadow-md -translate-y-1/2 ${
          isBeginning ? "opacity-40 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isBeginning}
      >
        <FaChevronLeft className="w-5 h-5 text-green-600" />
      </button>
      <button
        className={`custom-next absolute right-3 top-1/2 z-10 bg-white p-2 rounded-full shadow-md -translate-y-1/2 ${
          isEnd ? "opacity-40 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isEnd}
      >
        <FaChevronRight className="w-5 h-5 text-green-600" />
      </button>
    </Swiper>
  );
};

export default RelatedProduct;
