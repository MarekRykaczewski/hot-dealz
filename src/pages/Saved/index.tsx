import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import usePagination from "../../hooks/usePagination";
import useSavedDeals from "../../hooks/useSavedDeals";
import Deals from "../../templates/Deals";
import { Deal } from "../../types";
import { createDealCard, filterDeals } from "../../utilities/dealsUtils";

function Saved() {
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const { savedDeals, loading } = useSavedDeals();
  const [dealsPerPage, setDealsPerPage] = useState(5);
  const [currentSorting, setCurrentSorting] = useState<any>("newest");

  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    savedDeals,
    dealsPerPage
  );

  const { category, query } = useParams<{
    category?: string;
    query?: string;
  }>();

  useEffect(() => {
    const filteredDealsCopy = filterDeals(
      savedDeals,
      category,
      query,
      currentSorting
    );
    setFilteredDeals(filteredDealsCopy);
  }, [category, savedDeals, currentSorting, query]);

  const dealElements = filteredDeals.map((item) => createDealCard(item));

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {filteredDeals.length > 0 ? (
        <Deals
          dealElements={dealElements}
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
          currentSorting={currentSorting}
          setCurrentSorting={setCurrentSorting}
          deals={filteredDeals}
        />
      ) : (
        <div>No saved deals found.</div>
      )}
    </div>
  );
}

export default Saved;
