import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './config/firebase';
import { doc, collection, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase";

export async function fetchProfileImage(userId, setProfileUrl) {
  try {
    const imageRef = ref(storage, `profileImages/${userId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    setProfileUrl(imageUrl);
  } catch (error) {
    const genericRef = ref(storage, "profileImages/avatar.png")
    const genericUrl = await getDownloadURL(genericRef);
    setProfileUrl(genericUrl);
    console.log('Error fetching profile image:', error);
  }
}

export const checkSavedDeal = async (setHasSaved, userId, postId) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedDealRef = doc(savedRef, postId);

  const savedDeal = await getDoc(savedDealRef);
  setHasSaved(savedDeal.exists());
};

export const toggleSaved = async (hasSaved, setHasSaved, userId, postId) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedPostRef = doc(savedRef, postId);

  const savedPost = await getDoc(savedPostRef);

  if (savedPost.exists()) {
    // post is already saved, so remove it
    await deleteDoc(savedPostRef);
    if (hasSaved) setHasSaved(false)
  } else {
    // post is not saved, so add it
    await setDoc(savedPostRef, {});
    if (!hasSaved) setHasSaved(true)
  }
};