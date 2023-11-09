import { useEffect, useState } from "react";
import { getImages } from "../api/firebase/storage";
import { Slide } from "../types";

function useImageLoader(imageURLs: string[]) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageList = await getImages(imageURLs);
        setSlides(imageList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [imageURLs]);

  return { slides, loading };
}

export default useImageLoader;
