import { doc, setDoc, collection, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from './config/firebase';

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

export const sortByNewest = (deals, setDeals) => {
  const dealsCopy = [...deals]
  dealsCopy.sort((a, b) => {
    return a.posted - b.posted
  })
  setDeals(dealsCopy)
}

export const sortByComments = (deals, setDeals) => {
  const dealsCopy = [...deals];
  dealsCopy.sort((a, b) => {
    return b.comments - a.comments;
  });
  setDeals(dealsCopy);
};

export const sortCommentsByNewest = (comments, setComments) => {
  const commentsCopy = [...comments];
  commentsCopy.sort((a, b) => a.posted.toDate() - b.posted.toDate());
  setComments(commentsCopy);
}