import { useEffect, useState } from "react";
import { fetchSavedDeals } from "../api/firebase/deals";
import { UserAuth } from "../context/AuthContext";

function useSavedDeals() {
  const [savedDeals, setSavedDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user }: { user: User | null } = UserAuth();
  console.log("Authenticated User:", user);
  console.log("UserId:", user.uid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDeals = await fetchSavedDeals(user.uid);
        console.log("Fetched deals:", fetchedDeals);
        setSavedDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching saved deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.uid]);

  return { savedDeals, loading };
}

export default useSavedDeals;
