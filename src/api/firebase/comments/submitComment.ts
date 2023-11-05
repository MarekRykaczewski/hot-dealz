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
): Promise<Comment[]> => {
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
    const updatedComments: Comment[] = [];
    commentsSnapshot.forEach((commentDoc) => {
      const commentData = commentDoc.data();
      const comment: Comment = {
        id: commentDoc.id,
        userId: commentData.userId,
        comment: commentData.comment,
        posted: commentData.posted,
      };
      updatedComments.push(comment);
    });

    return updatedComments;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
