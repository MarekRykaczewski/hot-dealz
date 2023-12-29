import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../../config/firebase";

const getUserIdFromUsername = async (username) => {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // Assuming there's only one user with the given username
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      return userId;
    } else {
      console.log("User not found with the given username");
      return null;
    }
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

export default getUserIdFromUsername;
