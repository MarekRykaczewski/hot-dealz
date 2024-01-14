import DealCard from "../components/DealCard";
import { Deal } from "../types";

export function filterDeals(
  deals: Deal[],
  category: string,
  query: string,
  sorting: string
) {
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

  if (sorting === "newest") {
    filteredDealsCopy.sort(
      (a, b) => (b.posted?.seconds || 0) - (a.posted?.seconds || 0)
    );
  } else if (sorting === "comments") {
    filteredDealsCopy.sort((a, b) => (b.comments || 0) - (a.comments || 0));
  }

  return filteredDealsCopy;
}

export function formatDealDate(rawDate: Deal) {
  const milliseconds = rawDate.posted.seconds * 1000;
  const date = new Date(milliseconds);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });

  return { formattedDate, formattedTime };
}

export function createDealCard(item: Deal) {
  const { formattedDate, formattedTime } = formatDealDate(item);

  return (
    <DealCard
      key={item.id}
      postId={item.id}
      title={item.title}
      dealLink={item.dealLink}
      freeShipping={item.freeShipping}
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
      startDate={item.startDate}
      endDate={item.endDate}
    />
  );
}
