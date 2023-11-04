import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

// Function to get imges for slider
export const getImages = async (imageURLs) => {
  const imageList = [];
  const urlsToFetch = Array.isArray(imageURLs) ? imageURLs : [imageURLs]; // To handle both arrays and single images (strings)

  try {
    for (const imageURL of urlsToFetch) {
      // Create a reference to the image based on the provided imageURL
      const imageRef = ref(storage, imageURL);

      try {
        // Fetch the download URL for the image
        const url = await getDownloadURL(imageRef);
        imageList.push({ url }); // Wrap the URL in an object with a 'url' property
      } catch (error) {
        // Handle error for individual images
        console.error(`Error fetching image at ${imageURL}:`, error);
      }
    }

    return imageList;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
