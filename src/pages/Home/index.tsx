import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDeals } from "../../hooks/useDeals";
import usePagination from "../../hooks/usePagination";
import { Deal } from "../../types";
import Deals from "./Deals";
import LoadingSpinner from "../../components/LoadingSpinner";
import { createDealCard, filterDeals } from "../../utilities/dealsUtils";

function Home() {
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [dealsPerPage, setDealsPerPage] = useState(5);
  const { category, query } = useParams<{ category: string }>();
  const [currentSorting, setCurrentSorting] = useState<any>("newest");

  const { deals, loading } = useDeals();
  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    filteredDeals,
    dealsPerPage
  );

  useEffect(() => {
    const filteredDealsCopy = filterDeals(
      deals,
      category,
      query,
      currentSorting
    );
    setFilteredDeals(filteredDealsCopy);
  }, [category, deals, currentSorting, query]);

  const dealElements = currentItems.map((item) => createDealCard(item));

  if (loading) return <LoadingSpinner />;

  return (
    <Deals
      dealElements={dealElements}
      totalPages={totalPages}
      paginate={paginate}
      currentPage={currentPage}
      currentSorting={currentSorting}
      setCurrentSorting={setCurrentSorting}
      deals={deals}
    />
  );
}

export default Home;
