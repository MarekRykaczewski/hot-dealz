import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

// Function to fetch the profile URL of a user
export async function getProfileUrlFromUserId(userId) {
  const storageRef = ref(storage, `profileImages/${userId}/image`);
  const profileImageUrl = await getDownloadURL(storageRef);
  return profileImageUrl;
}
