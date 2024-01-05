import React, { useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utilities/copyToClipboard";
import { formatPostedDate } from "../../utils";

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
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);
    setIsCopied(true);
    toast.success("Copied code to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="text-sm text-gray-600 flex flex-col w-full items-start gap-3">
      <div className="flex flex-col items-center text-sm">
        {posted && <span>{formatPostedDate(posted)}</span>}
      </div>
      <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
      <div className="flex gap-3 items-center w-full">
        <p className="text-orange-500 font-bold text-3xl"> {price}zł</p>
        <del className="text-gray-500 font-bold text-3xl">
          {nextBestPrice}zł
        </del>
        <p className="text-3xl">
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
            Go to deal <FiExternalLink />
          </a>
        </button>
        {voucherCode && (
          <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
            <button
              value={voucherCode}
              onClick={(e) => handleCopyToClipboard(e.target.value)}
              className="flex border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
            >
              {isCopied ? "Copied!" : voucherCode} <BiCopyAlt size={20} />
            </button>
          </div>
        )}
      </div>
      <Link
        to={`/profile/${owner}`}
        className="flex items-center justify-between gap-5"
      >
        <div className="flex justify-center items-center">
          {
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={profileUrl}
              alt="Profile"
            />
          }
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Shared by {owner}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DealFullDetails;
