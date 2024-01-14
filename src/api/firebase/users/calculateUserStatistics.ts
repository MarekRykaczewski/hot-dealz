import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import getAverageTotalScore from "../deals/getAverageTotalScore";
import getHottestDeal from "../deals/getHottestDeal";
import getUserCommentsCount from "./getUserCommentsCount";

export const calculateUserStatistics = async (userId: string) => {
  try {
    // Use the 'collection' query to count documents without fetching them
    const dealsQuery = query(
      collection(db, "deals"),
      where("userId", "==", userId)
    );

    // Get the count of the result set directly
    const countDeals = await getCountFromServer(dealsQuery);
    const numberOfDeals = countDeals.data().count;

    // Fetch the total comments for the user
    const totalComments = await getUserCommentsCount(userId);

    // Fetch the average total score for the user
    const averageTotalScore = await getAverageTotalScore(userId);

    // Fetch the hottest deal using the separate function
    const hottestDeal = await getHottestDeal(userId);

    return {
      numberOfDeals,
      totalComments,
      averageTotalScore,
      hottestDeal,
    };
  } catch (error) {
    console.error("Error calculating user statistics:", error);
    throw error;
  }
};

export default calculateUserStatistics;
