import React, { useEffect, useRef, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { formatPostedDate } from "../../utils";
import ImageSlider from "../ImageSlider";
import DealCardVotes from "./DealCardVotes";
import { copyToClipboard } from "../../utilities/copyToClipboard";
import { FaFacebook, FaCopy } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";

interface DealCardDetailedProps {
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
  owner,
  voucherCode,
  profileUrl,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const shareButtonRef = useRef(null);

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleShareButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      dealLink
    )}`;
    window.open(shareUrl, "_blank");
    setIsDropdownOpen(false);
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      dealLink
    )}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank");
    setIsDropdownOpen(false);
  };

  const handleCopyLink = () => {
    copyToClipboard(dealLink);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      event.target !== shareButtonRef.current
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="flex w-full gap-2 items-center justify-between">
            <div className="w-1/2">
              <DealCardVotes postId={dealId} archived={isArchived} />
            </div>
            <div className="relative flex justify-end w-1/2">
              <button
                ref={shareButtonRef}
                onClick={handleShareButtonClick}
                className="flex gap-2 font-bold border w-full hover:bg-gray-100 transition items-center justify-center rounded-full h-8"
              >
                <CiShare2 size={24} />
                Share
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute overflow-hidden w-full font-bold top-full left-0 mt-2 bg-white border rounded-lg shadow-md"
                >
                  <button
                    onClick={handleFacebookShare}
                    className="flex hover:text-orange-500 transition-all items-center justify-center gap-2 w-full text-left p-2"
                  >
                    <FaFacebook size={18} />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={handleTwitterShare}
                    className="flex hover:text-orange-500 transition-all items-center justify-center gap-2 w-full text-left p-2"
                  >
                    <BsTwitterX size={18} />
                    <span>X (Twitter)</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex hover:text-orange-500 transition-all items-center justify-center gap-2 w-full text-left p-2"
                  >
                    <FaCopy size={18} />
                    <span>Copy Link</span>
                  </button>
                </div>
              )}
            </div>
          </div>
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
          <div className="flex items-center justify-between gap-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCardDetailed;
