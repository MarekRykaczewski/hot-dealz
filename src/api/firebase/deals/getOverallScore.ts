import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function getTotalScore(postId: string) {
  const postDocRef = doc(db, "deals", postId);

  try {
    const postSnapshot = await getDoc(postDocRef);

    if (postSnapshot.exists()) {
      const { totalScore } = postSnapshot.data();
      return totalScore;
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}
