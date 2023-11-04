// Fetch profile image

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";

export const fetchProfileImageById = async (currentUserId: string) => {
  try {
    const imageRef = ref(storage, `profileImages/${currentUserId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.log("Error fetching profile image:", error);
    return null;
  }
};
