// Fetch profile image

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

export const fetchProfileImageById = async (currentUserId) => {
  try {
    const imageRef = ref(storage, `profileImages/${currentUserId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.log("Error fetching profile image:", error);
    return null;
  }
};
