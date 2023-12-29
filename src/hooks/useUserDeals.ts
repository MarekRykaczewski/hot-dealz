import { useEffect, useState } from "react";
import { Deal } from "../types";
import { fetchDealsByUserId } from "../api/firebase/deals/fetchDealsByUserId";

export function useUserDeals(userId) {
  const [userDeals, setUserDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userDealList = await fetchDealsByUserId(userId);
        setUserDeals(userDealList);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [userId]);

  return { userDeals, loading };
}
