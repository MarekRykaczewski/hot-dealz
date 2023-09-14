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
    const timestampA = a.posted.seconds * 1000
    const timestampB = b.posted.seconds * 1000
    return timestampB - timestampA;
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
  commentsCopy.sort((a, b) => b.posted.toDate() - a.posted.toDate());
  setComments(commentsCopy);
}

export const sortCommentsByLikes = (comments, setComments) => {
  const commentsCopy = [...comments];
  console.log(commentsCopy)
  commentsCopy.sort((a, b) => {
    const numLikesA = a.likes ? a.likes.length : 0;
    const numLikesB = b.likes ? b.likes.length : 0;
    return numLikesB - numLikesA;
  });
  setComments(commentsCopy);
};