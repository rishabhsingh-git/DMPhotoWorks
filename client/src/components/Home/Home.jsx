import React from "react";
import Carousel from "../carousel/Carousel";
import HomegridImages from "../HomegridImages/HomegridImages";

const Home = () => {
  return (
    <div style={{ marginTop: "100vh" }}>
      <Carousel />
      <HomegridImages />
    </div>
  );
};

export default Home;
