import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function incrementUserComments(userId) {
  try {
    const userRef = doc(db, "users", userId);

    // Fetch the user document
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentComments = userDoc.data().totalComments || 0;

      // Update the total comments in the user document
      await updateDoc(userRef, {
        totalComments: currentComments + 1,
      });

      console.log(`Incremented total comments for user ${userId}`);
    }
  } catch (error) {
    console.error("Error incrementing user comments:", error);
    throw error;
  }
}
