import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function updateOverallScore(
  dealId: string,
  voteType: "like" | "dislike"
) {
  try {
    const dealRef = doc(db, "deals", dealId);
    const dealDoc = await getDoc(dealRef);

    if (dealDoc.exists()) {
      const batch = writeBatch(db);

      // Get the current totalScore
      const currentScore = dealDoc.data().totalScore || 0;

      // Calculate the new score based on the voteType
      const voteValue = voteType === "like" ? 1 : -1;
      const newScore = currentScore + voteValue;

      // Update the totalScore field
      batch.update(dealRef, { totalScore: newScore });

      // Commit the batch write
      await batch.commit();

      return newScore;
    } else {
      console.error("Deal does not exist:", dealId);
      return null;
    }
  } catch (error) {
    console.error("Error updating overall score:", error);
    throw error;
  }
}
