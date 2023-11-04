import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to post comment
export const submitComment = async (
  postId: string,
  newComment: { userId: string; comment: string }
) => {
  try {
    const postCommentsCollectionRef = collection(
      db,
      "deals",
      postId,
      "comments"
    );
    const newCommentDocRef = doc(postCommentsCollectionRef);

    await setDoc(newCommentDocRef, {
      userId: newComment.userId,
      comment: newComment.comment,
      posted: serverTimestamp(),
    });

    // Fetch the updated comments after submitting a new comment
    const commentsSnapshot = await getDocs(
      collection(db, "deals", postId, "comments")
    );
    const updatedComments: { id: string }[] = [];
    commentsSnapshot.forEach((commentDoc) => {
      updatedComments.push({
        id: commentDoc.id,
        ...commentDoc.data(),
      });
    });

    return updatedComments;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
