import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import DealCard from "../../components/DealCard/DealCard";
import { useDeals } from "../../hooks/useDeals";
import usePagination from "../../hooks/usePagination";
import { Deal } from "../../types";
import Deals from "./Deals";
import Saved from "./Saved";
import DealDetails from "./[id]/DealDetails";
import LoadingSpinner from "../../components/LoadingSpinner";

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
    let filteredDealsCopy = [...deals];

    if (category) {
      filteredDealsCopy = filteredDealsCopy.filter(
        (deal) => deal.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredDealsCopy = filteredDealsCopy.filter(
        (deal) =>
          deal.title.toLowerCase().includes(lowercaseQuery) ||
          deal.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (currentSorting === "newest") {
      filteredDealsCopy.sort(
        (a, b) => (b.posted?.seconds || 0) - (a.posted?.seconds || 0)
      );
    } else if (currentSorting === "comments") {
      filteredDealsCopy.sort((a, b) => (b.comments || 0) - (a.comments || 0));
    }

    setFilteredDeals(filteredDealsCopy);
  }, [category, deals, currentSorting, query]);

  function formatDealDate(item) {
    const milliseconds = item.posted.seconds * 1000;
    const date = new Date(milliseconds);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);

    const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });

    return { formattedDate, formattedTime };
  }

  function createDealCard(item) {
    const { formattedDate, formattedTime } = formatDealDate(item);

    return (
      <DealCard
        key={item.id}
        postId={item.id}
        title={item.title}
        dealLink={item.dealLink}
        owner={item.owner}
        price={item.price}
        nextBestPrice={item.nextBestPrice}
        description={item.description}
        date={formattedDate}
        time={formattedTime}
        voucherCode={item.voucherCode}
        commentsCount={item.comments}
        userId={item.userId}
        shippingCost={item.shippingCost}
        imageURLs={item.imageURLs}
        archived={item.archived}
      />
    );
  }

  const dealElements = currentItems.map(createDealCard);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Routes>
        <Route path="/search/:query" element={<Home />} />
        <Route path="/saved/*" element={<Saved />} />
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
