import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to toggle like on a comment
export async function toggleCommentLike(
  dealId: string,
  commentId: string,
  userId: string
) {
  const likesCollectionRef = collection(
    db,
    `deals/${dealId}/comments/${commentId}/likes`
  );

  try {
    // Check if the user has already liked the comment
    const commentLikesQuery = query(
      likesCollectionRef,
      where("userId", "==", userId)
    );
    const commentLikesSnapshot = await getDocs(commentLikesQuery);
    const userHasLiked = !commentLikesSnapshot.empty;

    if (userHasLiked) {
      // User has already liked the comment, so remove the like
      const likeDoc = commentLikesSnapshot.docs[0];
      await deleteDoc(doc(likesCollectionRef, likeDoc.id));
    } else {
      // User has not liked the comment, so add the like
      await addDoc(likesCollectionRef, { userId });
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
  }
}
