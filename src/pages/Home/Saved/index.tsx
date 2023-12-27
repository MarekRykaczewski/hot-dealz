import { useEffect, useState } from "react";
import { fetchSavedDeals } from "../../../api/firebase/deals";
import CategoryCarousel from "../../../components/CategoryCarousel";
import DealCard from "../../../components/DealCard/DealCard";
import FooterNav from "../../../components/Footer/FooterNav";
import Tabs from "../../../components/Tabs";
import { auth } from "../../../config/firebase";
import usePagination from "../../../hooks/usePagination";
import { Deal } from "../../../types";

function Saved() {
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealsPerPage, setDealsPerPage] = useState(5);
  const [currentSorting, setCurrentSorting] = useState<any>("newest");

  const userId = auth.currentUser?.uid;

  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    filteredDeals,
    dealsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const fetchedDeals = await fetchSavedDeals(userId);
          setDeals(fetchedDeals);
        }
      } catch (err) {
        console.error("Error fetching saved deals:", err);
      }
    };

    fetchData();
  }, [userId]);

  const dealElements = deals.map((item) => {
    const milliseconds = item.posted.seconds * 1000;
    const date = new Date(milliseconds);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });
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
        imageURLs={item.imageURLs}
        userId={item.userId}
        archived={item.archived}
        shippingCost={item.shippingCost}
      />
    );
  });

  return (
    <div>
      <CategoryCarousel />
      <div className="flex bg-gray-200 flex-col w-full h-screen gap-3 justify-start items-center">
        <Tabs
          currentSorting={currentSorting}
          setCurrentSorting={setCurrentSorting}
        />
        {deals.length > 0 ? dealElements : <div> Nothing here! </div>}
        <FooterNav
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Saved;
