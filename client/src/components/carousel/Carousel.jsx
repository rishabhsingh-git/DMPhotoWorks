import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";

const Carousel = ({ images, autoScroll = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const goToPrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const goToNext = () => {
    setIsFading(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const goToSlide = (slideIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    if (!autoScroll) return;

    const intervalId = setInterval(goToNext, interval);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [currentIndex, autoScroll, interval, images]);

  return (
    <div className="carousel">
      <div className={`carousel-inner ${isFading ? "fading" : ""}`}>
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="carousel-image"
        />
      </div>
      <button
        onClick={goToPrevious}
        className="carousel-button carousel-button-left"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={goToNext}
        className="carousel-button carousel-button-right"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
