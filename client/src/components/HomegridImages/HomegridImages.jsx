import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Homegrid.css";

const HomegridImages = ({ images }) => {
  const dispatch = useDispatch();
  const { isAllAssetsLoading, isAllAssetsSuccess, assetsData, error } =
    useSelector((state) => state.assets);

  const gridItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0 }
    );

    gridItemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      if (gridItemRefs.current.length) {
        gridItemRefs.current.forEach((item) => {
          if (item) observer.unobserve(item);
        });
      }
    };
  }, [assetsData]);

  return (
    <div className="image-grid">
      {assetsData?.length
        ? assetsData
            .filter((val) => val.category === "Home Screen")
            .map((data, index) => (
              <div
                key={index}
                className="image-grid-item"
                ref={(el) => (gridItemRefs.current[index] = el)}
              >
                <img src={data?.url} alt={`Grid item ${index}`} />
              </div>
            ))
        : null}
    </div>
  );
};

export default HomegridImages;
