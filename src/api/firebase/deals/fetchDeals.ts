import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to fetch deals
export async function fetchDeals() {
  try {
    const querySnapshot = await getDocs(collection(db, "deals"));
    const dealList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const dealData = doc.data();
        const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
        const commentsCount = commentsSnapshot.size;
        return { id: doc.id, ...dealData, comments: commentsCount };
      })
    );
    return dealList;
  } catch (err) {
    console.error("Error fetching deals:", err);
    throw err;
  }
}
