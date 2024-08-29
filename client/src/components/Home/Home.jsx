import React from "react";
import Sample from "../../assets/Sample.jpg";
import Sample2 from "../../assets/Sample2.JPG";
import Sample3 from "../../assets/Sample3.jpg";
import Sample1 from "../../assets/Sample1.jpg";
import Carousel from "../carousel/Carousel";

const Home = () => {
  const images = [
    // "https://dl.dropboxusercontent.com/scl/fi/t8eocerhb28hajzjj0y5u/Sample.jpg?rlkey=2rieqd5uhza2sxxvqwsrh3b8l&dl=0",
    // "https://dl.dropboxusercontent.com/scl/fi/n73bp6408e6zn1zqvdju7/Sample1.jpg?rlkey=24eo1b4omhxvw56yw5i8rdlvt&dl=0",
    // "https://dl.dropboxusercontent.com/scl/fi/rnz1divvgzded7fh0zgc9/CBD09576.jpg?rlkey=cujz3uqtuv1qg467uxv4ytmxh&dl=0",
    // "https://dl.dropboxusercontent.com/scl/fi/h9dq6wu8mrtu4rgwcquer/CBD09257.JPG?rlkey=qcwwoa16g22gqt7nkctdopful&dl=0",

    // "https://dl.dropboxusercontent.com/scl/fi/ymtyzpuvcfnzdprmb7376/Untitled-1.jpg?rlkey=ilyzzo7kci9o5j1xekoffjqnw&dl=0",
    "https://dl.dropboxusercontent.com/scl/fi/m6vowyo8v8ak61tpp7nar/CBD09576.jpg?rlkey=wszc3btuwcdkkpmp5pf3z5cnw&dl=0",
    "https://dl.dropboxusercontent.com/scl/fi/07mg3habim3uw0q1x3tpu/pexels-giorgio-de-angelis-482403-1413412.jpg?rlkey=c6w41p3hwh643rjge2qc4of8m&dl=0",
    "https://dl.dropboxusercontent.com/scl/fi/db1hpkqxyryhx587zn8fq/pexels-optical-chemist-340351297-15587985.jpg?rlkey=ss01c6z5i65z0cjszqokwjqo4&dl=0",
  ];
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
