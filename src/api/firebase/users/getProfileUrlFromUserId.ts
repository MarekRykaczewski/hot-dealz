import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";

// Function to fetch the profile URL of a user
export async function getProfileUrlFromUserId(userId: string) {
  try {
    const storageRef = ref(storage, `profileImages/${userId}/image`);
    const profileImageUrl = await getDownloadURL(storageRef);
    return profileImageUrl;
  } catch (error) {
    console.error("Error fetching profile image URL:", error);
    return null;
  }
}
