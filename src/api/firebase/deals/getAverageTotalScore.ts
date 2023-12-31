import {
  collection,
  query,
  where,
  getAggregateFromServer,
  average,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

// Function to get the average total score from user's deals
export const getAverageTotalScore = async (userId) => {
  try {
    // Use the 'query' function to create a query with conditions
    const dealsQuery = query(
      collection(db, "deals"),
      where("userId", "==", userId)
    );

    // Use the 'average' aggregation to calculate the average total score
    const aggregateSnapshot = await getAggregateFromServer(dealsQuery, {
      averageTotalScore: average("totalScore"),
    });

    // Get the result of the average total score directly
    const averageTotalScore = aggregateSnapshot.data().averageTotalScore;

    return averageTotalScore || 0;
  } catch (error) {
    console.error("Error fetching average total score:", error);
    throw error;
  }
};

export default getAverageTotalScore;
