import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useDeals } from "../../hooks/useDeals";
import usePagination from "../../hooks/usePagination";
import { Deal } from "../../types";
import Deals from "./Deals";
import Saved from "./Saved";
import DealDetails from "./[id]/DealDetails";
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
    <div>
      <Routes>
        <Route path="/search/:query" element={<Home />} />
        <Route path="/saved/" element={<Saved />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/deal/:dealId" element={<DealDetails />} />
        <Route
          path="/"
          element={
            <Deals
              dealElements={dealElements}
              totalPages={totalPages}
              paginate={paginate}
              currentPage={currentPage}
              currentSorting={currentSorting}
              setCurrentSorting={setCurrentSorting}
              deals={deals}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Home;
