import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";

export async function fetchProfileImageUrl(userId: string): Promise<string> {
  try {
    const imageRef = ref(storage, `profileImages/${userId}/image`);
    return await getDownloadURL(imageRef);
  } catch (error) {
    const genericRef = ref(storage, "profileImages/avatar.png");
    const genericUrl = await getDownloadURL(genericRef);
    return genericUrl;
  }
}
