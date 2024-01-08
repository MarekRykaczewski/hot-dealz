import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const usernameExists = async (username) => {
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(
    query(usersCollection, where("username", "==", username))
  );
  return querySnapshot.size > 0;
};

export default usernameExists;
