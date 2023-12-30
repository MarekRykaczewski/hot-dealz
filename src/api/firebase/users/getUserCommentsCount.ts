import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to get user comments count
export const getUserCommentsCount = async (userId) => {
  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.totalComments || 0;
    } else {
      console.error("User document not found");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching user comments count:", error);
    throw error;
  }
};

export default getUserCommentsCount;
