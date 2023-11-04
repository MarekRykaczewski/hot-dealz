import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function fetchSavedDeals(userId: string) {
  try {
    const savedRef = collection(db, "users", userId, "saved");
    const savedSnapshot = await getDocs(savedRef);
    const savedDealIds = savedSnapshot.docs.map((doc) => doc.id);

    if (savedDealIds.length === 0) {
      // No saved deals, no need to query
      return [];
    }

    const dealsQuery = query(
      collection(db, "deals"),
      where("__name__", "in", savedDealIds)
    );
    const querySnapshot = await getDocs(dealsQuery);

    const fetchedDeals: { comments: number; id: string }[] = [];
    querySnapshot.forEach(async (doc) => {
      const dealData = doc.data();
      const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
      const commentsCount = commentsSnapshot.size;
      fetchedDeals.push({ id: doc.id, ...dealData, comments: commentsCount });
    });

    return fetchedDeals;
  } catch (err) {
    console.error("Error fetching saved deals:", err);
    return [];
  }
}
