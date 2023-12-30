import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

export const getHottestDeal = async (userId) => {
  try {
    // Query for the hottest deal
    const hottestDealQuery = query(
      collection(db, "deals"),
      where("userId", "==", userId),
      orderBy("totalScore", "desc"),
      limit(1)
    );

    // Fetch the hottest deal
    const hottestDealSnapshot = await getDocs(hottestDealQuery);
    const hottestDeal = hottestDealSnapshot.docs[0]?.data().totalScore || null;

    return hottestDeal;
  } catch (error) {
    console.error("Error fetching hottest deal:", error);
    throw error;
  }
};

export default getHottestDeal;
