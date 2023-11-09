import { useEffect, useState } from "react";
import { fetchDealData } from "../api/firebase/deals";
import { Deal } from "../types";

export function useDealDetails(dealId: string) {
  const [deal, setDeal] = useState<Deal | null>(null);

  useEffect(() => {
    async function fetchData(dealId: string) {
      const specificDeal = (await fetchDealData(dealId)) as Deal;
      if (specificDeal) {
        setDeal(specificDeal);
      } else {
        setDeal(null);
      }
    }

    if (dealId) {
      fetchData(dealId);
    }
  }, [dealId]);

  return deal;
}
