import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to fetch a username from a comment
export async function getUsernameFromComment(commentId, dealId) {
  const commentRef = doc(
    collection(doc(db, `deals/${dealId}`), "comments"),
    commentId
  );
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error(`Comment not found with id ${commentId}`);
  }

  const userId = commentDoc.data().userId;
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error(`User not found with id ${userId}`);
  }

  const username = userDoc.data().username;
  return username;
}
