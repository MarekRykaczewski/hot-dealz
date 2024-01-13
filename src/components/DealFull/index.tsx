import React, { useRef, useState } from "react";
import ImageSlider from "../DealImageSlider";
import DealActions from "./DealActions";
import DealFullDetails from "./DealFullDetails";

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
  freeShipping,
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
      } sm:flex-row flex-col transition-all duration-300 bg-white p-5 flex justify-center items-center rounded-lg w-full mt-3`}
    >
      <div className="h-72 w-full bg-slate-500 overflow-hidden rounded-xl">
        <ImageSlider dealId={dealId} imageURLs={imageURLs} />
      </div>
      <div className="bg-white sm:px-4 sm:py-0 py-4 flex flex-col w-full">
        <div className="text-sm text-gray-600 flex flex-col items-start gap-3">
          <DealActions
            dealId={dealId}
            isArchived={isArchived}
            shareButtonRef={shareButtonRef}
            handleShareButtonClick={handleShareButtonClick}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dealLink={dealLink}
          />
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
            freeShipping={freeShipping}
          />
        </div>
      </div>
    </div>
  );
};

export default DealFull;
