import { getDownloadURL, ref } from "firebase/storage";
import { SetStateAction } from "react";
import { storage } from "../../../config/firebase";

export async function fetchProfileImage(
  userId: string,
  setProfileUrl: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
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
