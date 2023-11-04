import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

export async function fetchProfileImage(userId, setProfileUrl) {
  try {
    const imageRef = ref(storage, `profileImages/${userId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    setProfileUrl(imageUrl);
  } catch (error) {
    const genericRef = ref(storage, "profileImages/avatar.png");
    const genericUrl = await getDownloadURL(genericRef);
    setProfileUrl(genericUrl);
    console.log("Error fetching profile image:", error);
  }
}
