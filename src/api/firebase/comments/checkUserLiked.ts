import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to check if the current user has already liked the comment
export async function checkUserLiked(postId, commentId, userId) {
  const likesCollectionRef = collection(
    db,
    `deals/${postId}/comments/${commentId}/likes`
  );

  try {
    const commentLikesQuery = query(
      likesCollectionRef,
      where("userId", "==", userId)
    );
    const commentLikesSnapshot = await getDocs(commentLikesQuery);
    const userHasLiked = !commentLikesSnapshot.empty;
    return userHasLiked;
  } catch (error) {
    console.error("Error checking user liked status:", error);
    return false; // Return false in case of an error
  }
}
