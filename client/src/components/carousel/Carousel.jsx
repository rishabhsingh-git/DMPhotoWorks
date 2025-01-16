import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets, clearUploadStatus } from "../../store/assetsReducer";
import { Toaster, Skeleton } from "../../shared/index";
import { CATEGORY_CONSTANTS_PORTFOLIO } from "../../common/constant";

const Carousel = ({ autoScroll = true, interval = 2000 }) => {
  const [isToastVisible, setShowToaster] = useState(false);
  const [toasterMessage, setShowToasterMesssage] = useState("");

  const dispatch = useDispatch();
  const { assetsData, error, isAllAssetsLoading, isAllAssetsSuccess } =
    useSelector((state) => state.assets);

  let filteredData = assetsData?.filter(
    (val) => val?.category === CATEGORY_CONSTANTS_PORTFOLIO.carousel_image
  );

  useEffect(() => {
    dispatch(
      fetchAllAssets({
        category: [
          CATEGORY_CONSTANTS_PORTFOLIO.carousel_image,
          CATEGORY_CONSTANTS_PORTFOLIO.home_screen,
        ],
      })
    );
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? filteredData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === filteredData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoScroll) return;

    const intervalId = setInterval(goToNext, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex, autoScroll, interval]);

  useEffect(() => {
    if (error?.isError) {
      setShowToaster(true);
      setShowToasterMesssage(error?.message);
    }
  }, [error?.isError]);

  const handleToasterClose = () => {
    setShowToaster(false);
    setShowToasterMesssage("");
    dispatch(clearUploadStatus(""));
  };

  const renderLoading = () => {
    if (isAllAssetsLoading) {
      return true;
    }
  };

  return (
    <div>
      {!renderLoading() && assetsData?.length ? (
        <div className="carousel">
          <div
            className="carousel-3d"
            style={{
              transform: `rotateY(${
                -currentIndex * (360 / filteredData.length)
              }deg)`,
            }}
          >
            {filteredData.map((item, index) => {
              const angle = (360 / filteredData.length) * index;
              return (
                <img
                  key={index}
                  src={item.url}
                  alt="carousel"
                  className="carousel-image"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(1000px)`,
                  }}
                />
              );
            })}
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
            {filteredData.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      ) : (
        <Skeleton width={"100%"} height={"100vh"} />
      )}
      {isToastVisible ? (
        <Toaster
          isFailure={error?.isError}
          message={toasterMessage}
          onClose={handleToasterClose}
        />
      ) : null}
    </div>
  );
};

export default Carousel;
