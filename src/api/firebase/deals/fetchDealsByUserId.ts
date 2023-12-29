import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Deal } from "../../../types";

// Function to fetch deals by userId from Firestore
export async function fetchDealsByUserId(userId): Promise<Deal[]> {
  try {
    const dealsRef = collection(db, "deals");
    const q = query(dealsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userDeals = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const dealData = doc.data() as Deal;
        const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
        const commentsCount = commentsSnapshot.size;
        return { ...dealData, comments: commentsCount, dealId: doc.id };
      })
    );

    return userDeals;
  } catch (error) {
    console.error("Error fetching user deals:", error);
    throw error;
  }
}
