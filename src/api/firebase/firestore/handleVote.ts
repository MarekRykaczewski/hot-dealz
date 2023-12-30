import { User } from "firebase/auth";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { updateOverallScore } from "./updateOverallScore";

export async function handleVote(
  postId: string,
  voteType: "like" | "dislike",
  user: User
) {
  try {
    const collectionName = voteType === "like" ? "likes" : "dislikes";
    const oppositeCollectionName = voteType === "like" ? "dislikes" : "likes";

    const voteRef = doc(
      collection(db, "deals", postId, collectionName),
      user?.uid
    );

    // Check if the document exists before trying to delete it
    const docSnapshot = await getDoc(voteRef);

    // Remove the user's vote from the opposite collection if it exists
    const oppositeVoteRef = doc(
      collection(db, "deals", postId, oppositeCollectionName),
      user?.uid
    );
    const oppositeDocSnapshot = await getDoc(oppositeVoteRef);

    const batch = writeBatch(db);

    if (!docSnapshot.exists()) {
      // If the document doesn't exist, add it to the current collection
      batch.set(voteRef, {});

      if (oppositeDocSnapshot.exists()) {
        // If the user has a vote in the opposite collection, remove it
        batch.delete(oppositeVoteRef);
      }

      // Update the overall score
      await updateOverallScore(postId, voteType);
    } else {
      // If the document exists, delete it
      batch.delete(voteRef);

      // Update the overall score
      await updateOverallScore(postId, voteType);
    }

    // Commit the batch write
    await batch.commit();

    return true;
  } catch (err) {
    console.error("Error in handleVote:", err);
    return false;
  }
}
