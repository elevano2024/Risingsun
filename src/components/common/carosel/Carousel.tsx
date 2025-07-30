/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.scss";

const Carousel = ({
  carouselImages,
  setCurrentIndex,
}: {
  carouselImages: any[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [index, setIndex] = useState<number>(0);

  const updateCarousel = () => {
    const nextIndex = (index + 1) % carouselImages.length;
    setIndex((prevIndex: number) => {
      if (prevIndex === nextIndex) {
        return (prevIndex + 1) % carouselImages.length;
      }
      return nextIndex;
    });
    setTimeout(() => {
      updateCarousel();
    }, 5000);
  };

  useEffect(() => {
    if (carouselImages.length > 0) {
      updateCarousel();
    }
  }, []);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <div className="carousel">
      {/* Yellow Squiggles */}

      {/* Carousel Content */}
      <div className="carousel__image-wrapper">
        <AnimatePresence mode="wait">
          <motion.img
            key={carouselImages[index]}
            src={carouselImages[index].image}
            alt={`carousel-slide-${index}`}
            className="carousel__image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <img
          src="/images/carouselborder-1.svg"
          className="carousel__border bottom"
          alt="Carousel Border"
        />
        <img
          src="/images/carouselborder-2.svg"
          className="carousel__border top"
          alt="Carousel Border"
        />
      </div>
      {/* Dots */}
      <div className="carousel__dots">
        {carouselImages.map((_: any, i: number) => (
          <div
            key={i}
            className={`carousel__dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
