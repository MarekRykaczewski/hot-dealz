import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function checkVote(postId: string, userId: string) {
  const postDocRef = doc(db, "deals", postId);
  const likesCollectionRef = collection(postDocRef, "likes");
  const dislikesCollectionRef = collection(postDocRef, "dislikes");

  try {
    const postSnapshot = await getDoc(postDocRef);

    if (postSnapshot.exists()) {
      const userLikedSnapshot = await getDoc(doc(likesCollectionRef, userId));
      const userDislikedSnapshot = await getDoc(
        doc(dislikesCollectionRef, userId)
      );

      if (userLikedSnapshot.exists()) {
        return "like"; // User voted for
      } else if (userDislikedSnapshot.exists()) {
        return "dislike"; // User voted against
      } else {
        return null; // User has not voted
      }
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}
