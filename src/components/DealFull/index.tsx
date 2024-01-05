import React, { useRef, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import ImageSlider from "../DealImageSlider";
import DealCardVotes from "../DealVotes";
import DealFullDetails from "./DealFullDetails";
import ShareDropdown from "./ShareDropdown";

interface DealFullProps {
  profileUrl: string;
  dealId: string;
  isArchived: boolean;
  imageURLs: string[];
  posted: {
    seconds: number;
    nanoseconds: number;
  };
  title: string;
  price: number;
  nextBestPrice: number;
  shippingCost: number;
  dealLink: string;
  owner: string;
  voucherCode?: string;
}

const DealFull: React.FC<DealFullProps> = ({
  dealId,
  isArchived,
  imageURLs,
  posted,
  title,
  price,
  nextBestPrice,
  shippingCost,
  dealLink,
  owner,
  voucherCode,
  profileUrl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const shareButtonRef = useRef(null);

  const handleShareButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`${
        isArchived && "filter grayscale"
      } sm:flex-row flex-col transition-all duration-300 bg-white p-5 flex justify-center items-center rounded-lg w-full max-w-3xl mt-3`}
    >
      <div className="h-72 w-full bg-slate-500 overflow-hidden rounded-xl">
        <ImageSlider dealId={dealId} imageURLs={imageURLs} />
      </div>
      <div className="bg-white p-4 flex flex-col w-full max-w-3xl">
        <div className="text-sm text-gray-600 flex flex-col items-start gap-3">
          <div className="flex w-full gap-2 items-center justify-between">
            <div className="w-1/2">
              <DealCardVotes postId={dealId} archived={isArchived} />
            </div>
            <div className="relative flex justify-end w-1/2">
              <button
                ref={shareButtonRef}
                onClick={handleShareButtonClick}
                className="flex share-button gap-2 font-bold border w-full hover:bg-gray-100 transition items-center justify-center rounded-full h-8"
              >
                <CiShare2 size={24} />
                Share
              </button>
              <ShareDropdown
                dealLink={dealLink}
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>
          </div>
          <DealFullDetails
            posted={posted}
            title={title}
            price={price}
            nextBestPrice={nextBestPrice}
            shippingCost={shippingCost}
            dealLink={dealLink}
            owner={owner}
            voucherCode={voucherCode}
            profileUrl={profileUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default DealFull;
