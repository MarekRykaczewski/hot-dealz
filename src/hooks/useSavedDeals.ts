import { useEffect, useState } from "react";
import { fetchSavedDeals } from "../api/firebase/deals";
import { UserAuth } from "../context/AuthContext";
import { Deal } from "../types";
import { User } from "firebase/auth";

interface SavedDealsData {
  savedDeals: Array<Deal>;
  loading: boolean;
}

function useSavedDeals(): SavedDealsData {
  const [savedDeals, setSavedDeals] = useState<Array<Deal>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user }: { user: User | null } = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const fetchedDeals = await fetchSavedDeals(user.uid);
          console.log("Fetched deals:", fetchedDeals);
          setSavedDeals(fetchedDeals);
        }
      } catch (error) {
        console.error("Error fetching saved deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  return { savedDeals, loading };
}

export default useSavedDeals;
