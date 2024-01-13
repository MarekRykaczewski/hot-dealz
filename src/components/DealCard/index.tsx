import ImageSlider from "../DealImageSlider";
import DealDetails from "./DealDetails";
import DealUserActions from "./DealUserActions";

interface DealCardProps {
  userId: string;
  postId: string;
  archived: boolean;
  imageURLs: string[];
  shippingCost: number;
  freeShipping: Boolean;
  title: string;
  date: string;
  time: string;
  owner: string;
  price: number;
  nextBestPrice: number;
  description: string;
  dealLink: string;
  voucherCode?: string;
  commentsCount?: number;
  startDate?: Date;
  endDate?: Date;
}

function DealCard({
  userId,
  postId,
  archived,
  imageURLs,
  shippingCost,
  freeShipping,
  title,
  date,
  time,
  owner,
  price,
  nextBestPrice,
  description,
  dealLink,
  voucherCode,
  commentsCount,
  endDate,
}: DealCardProps) {
  const currentDate = new Date();
  const dealEndDate = new Date(endDate);

  return (
    <div
      className={`w-full shadow-md ${
        archived || (dealEndDate < currentDate && "filter grayscale")
      } bg-white p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between`}
    >
      <div className="h-64 sm:w-64 bg-red-200 overflow-hidden rounded-xl">
        <ImageSlider dealId={postId} imageURLs={imageURLs} />
      </div>
      <div className="bg-white flex-grow sm:px-4 px-0 py-4 sm:py-0 flex flex-col justify-between">
        <DealDetails
          postId={postId}
          archived={archived}
          date={date}
          time={time}
          title={title}
          price={price}
          nextBestPrice={nextBestPrice}
          freeShipping={freeShipping}
          shippingCost={shippingCost}
          voucherCode={voucherCode}
          dealLink={dealLink}
          description={description}
        />
        <DealUserActions
          userId={userId}
          owner={owner}
          postId={postId}
          commentsCount={commentsCount}
          voucherCode={voucherCode}
          dealLink={dealLink}
        />
      </div>
    </div>
  );
}

export default DealCard;
