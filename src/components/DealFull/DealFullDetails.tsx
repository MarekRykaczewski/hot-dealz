import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { formatPostedDate } from "../../utils";
import DealPrice from "../DealPrice";
import CopyToClipboardButton from "../ui/CopyToClipboardButton";
import ProfileLink from "./ProfileLink";

interface DealFullDetailsProps {
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
  profileUrl: string;
}

const DealFullDetails: React.FC<DealFullDetailsProps> = ({
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
  return (
    <div className="text-sm text-gray-600 flex flex-col w-full items-start gap-3">
      <div className="flex flex-col items-center text-sm">
        {posted && <span>{formatPostedDate(posted)}</span>}
      </div>
      <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
      <DealPrice
        price={price}
        nextBestPrice={nextBestPrice}
        shippingCost={shippingCost}
        freeShipping={freeShipping}
        textSize="2xl"
      />
      <div className="flex w-full gap-3 justify-center items-center">
        <button className="flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-2/3 h-8">
          <a
            className="flex gap-2 items-center"
            href={dealLink}
            target="_blank"
          >
            Go to deal <FiExternalLink />
          </a>
        </button>
        {voucherCode && (
          <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
            <CopyToClipboardButton text={voucherCode} />
          </div>
        )}
      </div>
      <ProfileLink owner={owner} profileUrl={profileUrl} />
    </div>
  );
};

export default DealFullDetails;
