import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Deal } from "../../../types";

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

    const fetchedDeals: Deal[] = [];
    querySnapshot.forEach(async (doc) => {
      const dealData = doc.data() as Deal;
      const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
      const commentsCount = commentsSnapshot.size;
      fetchedDeals.push({ ...dealData, comments: commentsCount, id: doc.id });
    });

    return fetchedDeals;
  } catch (err) {
    console.error("Error fetching saved deals:", err);
    return [];
  }
}
