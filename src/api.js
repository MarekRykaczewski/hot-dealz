import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './config/firebase';
import { doc, collection, getDoc, getDocs, deleteDoc, setDoc, writeBatch } from "firebase/firestore";
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

export async function getLikesAndDislikes(postId) {
  const likesCollection = collection(db, 'deals', postId, 'likes');
  const dislikesCollection = collection(db, 'deals', postId, 'dislikes');
  
  const likesData = await getDocs(likesCollection);
  const dislikesData = await getDocs(dislikesCollection);
  
  return {
    likes: likesData.docs,
    dislikes: dislikesData.docs,
  };
}

export async function handleVote(postId, voteType, user) {
  try {
    const collectionName = voteType === 'like' ? 'likes' : 'dislikes';
    const oppositeCollectionName = voteType === 'like' ? 'dislikes' : 'likes';

    const voteRef = doc(collection(db, 'deals', postId, collectionName), user?.uid);

    // Check if the document exists before trying to delete it
    const docSnapshot = await getDoc(voteRef);

    // Remove the user's vote from the opposite collection if it exists
    const oppositeVoteRef = doc(collection(db, 'deals', postId, oppositeCollectionName), user?.uid);
    const oppositeDocSnapshot = await getDoc(oppositeVoteRef);

    const batch = writeBatch(db);

    if (!docSnapshot.exists()) {
      // If the document doesn't exist, add it to the current collection
      batch.set(voteRef, {});

      if (oppositeDocSnapshot.exists()) {
        // If the user has a vote in the opposite collection, remove it
        batch.delete(oppositeVoteRef);
      }
    } else {
      // If the document exists, delete it
      batch.delete(voteRef);
    }

    // Commit the batch write
    await batch.commit();

    return true;
  } catch (err) {
    console.error('Error in handleVote:', err);
    return false;
  }
}
