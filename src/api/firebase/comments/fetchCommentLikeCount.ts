import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to fetch the number of likes for a comment
export async function fetchCommentLikeCount(dealId: string, commentId: string) {
  const likesCollectionRef = collection(
    db,
    `deals/${dealId}/comments/${commentId}/likes`
  );

  try {
    const commentLikesSnapshot = await getDocs(likesCollectionRef);
    const likeCount = commentLikesSnapshot.size;
    return likeCount;
  } catch (error) {
    console.error("Error fetching comment like count:", error);
    return 0; // Return 0 in case of an error
  }
}
