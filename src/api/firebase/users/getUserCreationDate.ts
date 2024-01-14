import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const getUserCreationDate = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.createdAt;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user creation date:", error);
    throw error;
  }
};

export default getUserCreationDate;
