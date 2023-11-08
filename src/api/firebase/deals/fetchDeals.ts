import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Deal } from "../../../types";

// Function to fetch deals
export async function fetchDeals(): Promise<Deal[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "deals"));
    const dealList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const dealData = doc.data() as Deal;
        const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
        const commentsCount = commentsSnapshot.size;
        return { ...dealData, comments: commentsCount };
      })
    );
    return dealList;
  } catch (err) {
    console.error("Error fetching deals:", err);
    throw err;
  }
}
