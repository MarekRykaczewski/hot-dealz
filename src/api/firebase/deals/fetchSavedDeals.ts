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

    const fetchedDealsPromises: Promise<Deal>[] = [];
    querySnapshot.forEach((doc) => {
      const commentsPromise = getDocs(collection(doc.ref, "comments"));
      const dealPromise = commentsPromise.then((commentsSnapshot) => {
        const commentsCount = commentsSnapshot.size;
        return { ...(doc.data() as Deal), comments: commentsCount, id: doc.id };
      });

      fetchedDealsPromises.push(dealPromise);
    });

    const fetchedDeals = await Promise.all(fetchedDealsPromises);
    return fetchedDeals;
  } catch (err) {
    console.error("Error fetching saved deals:", err);
    return [];
  }
}
