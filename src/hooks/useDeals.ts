import { useEffect, useState } from "react";
import { fetchDeals } from "../api/firebase/deals";
import { Deal } from "../types";

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dealList = await fetchDeals();
        setDeals(dealList);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return { deals, loading };
}
