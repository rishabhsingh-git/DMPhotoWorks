import React, { useState, useEffect, useRef } from "react";
import "./Portfolio.css";
import { CATEGORY_CONSTANTS_PORTFOLIO } from "../../common/constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets } from "../../store/assetsReducer";
import { SpeedDial } from "../../shared";

const categories = [
  {
    name: "Wedding",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-varun-118342-5759233.jpg",
  },
  {
    name: "Pre-Wedding",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-trungnguyenphotog-1619303.jpg",
  },
  {
    name: "Birthday",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-silvia-trigo-545701-1857157.jpg",
  },
  {
    name: "Maternity",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-luana-jhenifer-santos-1087699500-24534190.jpg",
  },
  {
    name: "Outdoor",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-thais-silva-965543-2352337.jpg",
  },
  {
    name: "Model",
    image:
      "https://dmphotoworks.s3.amazonaws.com/DMPhotoworksImages/pexels-samarth-1193942.jpg",
  },
];

const VintagePortfolio = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState("");

  const showSelectedPortfolio = (category) => {
    setSelectedPortfolio(category);
  };

  const dispatch = useDispatch();
  const { assetsData } = useSelector((state) => state.assets);

  useEffect(() => {
    if (selectedPortfolio) {
      dispatch(
        fetchAllAssets({
          category: [selectedPortfolio],
        })
      );
    }
  }, [selectedPortfolio]);

  const hideSelectedPortfolio = () => {
    setSelectedPortfolio("");
  };

  return (
    <div>
      {!selectedPortfolio ? (
        <div className="vintage-portfolio">
          <header className="vintage-header">
            <h1>𝑷𝒐𝒓𝒕𝒇𝒐𝒍𝒊𝒐</h1>
            <p>Explore timeless moments captured beautifully</p>
          </header>

          <div className="portfolio-cards">
            {categories.map((category, index) => {
              return (
                <div key={index} className="portfolio-card">
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="card-image"
                    onClick={() => {
                      showSelectedPortfolio(category.name);
                    }}
                  />
                  <div className="card-overlay">
                    <h2 className="card-title">{category?.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid-container">
          {assetsData.map((image) => (
            <div key={image.id} className="grid-item">
              <img src={image.url} alt={image.title} loading="lazy" />
            </div>
          ))}
        </div>
      )}
      <SpeedDial handleNavigateBack={hideSelectedPortfolio} />
    </div>
  );
};

export default VintagePortfolio;
