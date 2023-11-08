import { ReactElement, useEffect, useState } from "react";
import { fetchSavedDeals } from "../../../api/firebase/deals";
import CategoryCarousel from "../../../components/CategoryCarousel";
import DealCard from "../../../components/DealCard/DealCard";
import FooterNav from "../../../components/FooterNav";
import { auth } from "../../../config/firebase";
import { Deal } from "../../../types";

interface SavedProps {
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Saved({ paginate, currentPage }: SavedProps): ReactElement {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealsPerPage, setDealsPerPage] = useState(5);

  const userId = auth.currentUser?.uid;

  const totalPages = Math.ceil(deals.length / dealsPerPage);

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
