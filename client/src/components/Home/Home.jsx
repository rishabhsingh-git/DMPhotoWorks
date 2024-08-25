import React from "react";
import Sample from "../../assets/Sample.jpg";
import Sample2 from "../../assets/Sample2.JPG";
import Sample3 from "../../assets/Sample3.jpg";
import Sample4 from "../../assets/Sample4.jpg";
import Sample1 from "../../assets/Sample1.jpg";
import Carousel from "../carousel/Carousel";

const Home = () => {
  const images = [Sample, Sample1, Sample4, Sample2, Sample3];
  return (
    <div>
      {/* <div role="status" class="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
  <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
</div> */}

      <Carousel images={images} />
    </div>
  );
};

export default Home;
