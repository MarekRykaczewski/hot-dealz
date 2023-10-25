import React, { useState } from "react";
import ImageSlider from "../ImageSlider";
import DealCardVotes from "./DealCardVotes";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiCopyAlt } from "react-icons/bi";

interface DealCardDetailedProps {
  dealId: string;
  isArchived: boolean;
  imageURLs: string[];
  posted: string;
  title: string;
  price: string;
  nextBestPrice: string;
  shippingCost: string;
  dealLink: string;
  profileUrl: string;
  owner: string;
  voucherCode?: string;
}

const DealCardDetailed: React.FC<DealCardDetailedProps> = ({
  dealId,
  isArchived,
  imageURLs,
  posted,
  title,
  price,
  nextBestPrice,
  shippingCost,
  dealLink,
  profileUrl,
  owner,
  voucherCode,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigator.clipboard.writeText(e.currentTarget.value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`${
        isArchived && "filter grayscale"
      } transition-all duration-300 bg-white p-5 flex justify-center items-center rounded-lg w-full max-w-3xl mt-3`}
    >
      <div className="h-72 w-full bg-slate-500 overflow-hidden rounded-xl">
        <ImageSlider dealId={dealId} imageURLs={imageURLs} />
      </div>
      <div className="bg-white p-4 flex flex-col w-full max-w-3xl">
        <div className="text-sm text-gray-600 flex flex-col items-start gap-3">
          <div className="flex flex-row-reverse w-full justify-between gap-2 items-center">
            <div>
              <div className="flex flex-col items-center text-lg">
                {posted && <span> {posted} </span>}
              </div>
            </div>
            <DealCardVotes postId={dealId} />
          </div>
          <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
          <div className="flex gap-3 items-center w-full">
            <p className="text-orange-500 font-bold text-3xl"> {price}zł</p>
            <del className=" text-gray-500 font-bold text-3xl">
              {" "}
              {nextBestPrice}zł{" "}
            </del>
            <p className="text-3xl">
              {" "}
              -{Math.floor(((+nextBestPrice - +price) / +nextBestPrice) * 100)}%
            </p>
            <p className="flex flex-row text-xl text-slate-500 gap-2 items-center ml-auto">
              <MdOutlineLocalShipping size={30} />
              {shippingCost}zł
            </p>
          </div>
          <div className="flex w-full gap-3 justify-center items-center">
            <button className="flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-2/3 h-8">
              <a
                className="flex gap-2 items-center"
                href={dealLink}
                target="_blank"
              >
                Go to deal
                <FiExternalLink />
              </a>
            </button>
            {voucherCode && (
              <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
                <button
                  value={voucherCode}
                  onClick={(e) => copyToClipboard(e)}
                  className="flex border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
                >
                  {" "}
                  {isCopied ? "Copied!" : voucherCode} <BiCopyAlt size={20} />{" "}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex justify-center items-center">
              <img className="w-10 h-10 rounded-full mr-4" src={profileUrl} />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">Shared by {owner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCardDetailed;