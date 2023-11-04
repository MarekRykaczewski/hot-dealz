import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const toggleSaved = async (
  hasSaved: boolean,
  setHasSaved: (arg0: boolean) => void,
  userId: string,
  postId: string
) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedPostRef = doc(savedRef, postId);

  const savedPost = await getDoc(savedPostRef);

  if (savedPost.exists()) {
    // post is already saved, so remove it
    await deleteDoc(savedPostRef);
    if (hasSaved) setHasSaved(false);
  } else {
    // post is not saved, so add it
    await setDoc(savedPostRef, {});
    if (!hasSaved) setHasSaved(true);
  }
};
