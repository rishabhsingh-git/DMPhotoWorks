import { useState, useEffect } from "react";

export const useLazyLoad = (highQualitySrc) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let observer;
    const imgElement = document.querySelector(`[data-src="${highQualitySrc}"]`);

    if (imgElement) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSrc(highQualitySrc);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(imgElement);
    }

    return () => observer && observer.disconnect();
  }, [highQualitySrc]);

  return src;
};
