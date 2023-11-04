import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCommentDetail, BiCopyAlt } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";
import { checkSavedDeal } from "../../api/firebase/firestore/checkSavedDeal";
import { toggleSaved } from "../../api/firebase/firestore/toggleSaved";
import { fetchProfileImage } from "../../api/firebase/storage";
import { auth } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";
import ImageSlider from "../ImageSlider";
import DealCardVotes from "./DealCardVotes";

interface DealCardProps {
  userId: string;
  postId: string;
  archived: boolean;
  imageURLs: string[];
  shippingCost: number;
  title: string;
  date: string;
  time: string;
  owner: string;
  price: number;
  nextBestPrice: number;
  description: string;
  dealLink: string;
  voucherCode: string | null;
  comments: number;
}

function DealCard({
  userId,
  postId,
  archived,
  imageURLs,
  shippingCost,
  title,
  date,
  time,
  owner,
  price,
  nextBestPrice,
  description,
  dealLink,
  voucherCode,
  comments,
}: DealCardProps) {
  const [hasSaved, setHasSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const { user } = UserAuth();
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, postId);
    }
  }, [postId, currentUserId]);

  useEffect(() => {
    fetchProfileImage(userId, setProfileUrl);
  }, [userId]);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(e.currentTarget.value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`w-full sm:max-w-4xl ${
        archived && "filter grayscale"
      } bg-white p-5 rounded-xl flex flex-col sm:flex-row sm:justify-between`}
    >
      <div className="h-64 sm:w-64 rounded-xl overflow-hidden bg-slate-500">
        <ImageSlider dealId={postId} imageURLs={imageURLs} />
      </div>
      <div className="bg-white flex-grow p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-gray-600 flex justify-between">
            <DealCardVotes postId={postId} archived={archived} />
            <div className="flex gap-2 items-center">
              <AiOutlineClockCircle size={"1.6em"} />
              <div className="flex flex-col items-center">
                <span>
                  {" "}
                  {date}, {time}{" "}
                </span>
              </div>
            </div>
          </div>
          <Link className="block" to={`/deal/${postId}`}>
            <div className="text-gray-900 font-bold text-xl hover:text-orange-500 transition">
              {title}
            </div>
          </Link>
          <div className="flex flex-wrap gap-3 text-xl">
            <p className="text-orange-500 font-bold"> {price}zł</p>
            <del className=" text-gray-500"> {nextBestPrice}zł</del>
            <p>
              {" "}
              -{Math.floor(
                ((nextBestPrice - price) / nextBestPrice) * 100
              )}%{" "}
            </p>
            <p className="flex flex-row text-slate-500 gap-2 items-center text-sm">
              {" "}
              <MdOutlineLocalShipping size={26} /> {shippingCost}zł{" "}
            </p>
          </div>
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
              <button className="flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-full h-8">
                <a
                  className="flex gap-2 items-center "
                  href={dealLink}
                  target="_blank"
                >
                  Go to deal
                  <FiExternalLink />{" "}
                </a>
              </button>
            </div>
          )}
          <p
            className={`text-gray-700 ${
              voucherCode ? "line-clamp-3" : "line-clamp-5"
            } w-full overflow-hidden text-ellipsis mb-3`}
          >
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-5 mt-4">
          <div className="flex justify-center items-center">
            <img className="w-8 h-8 rounded-full mr-2" src={profileUrl} />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{owner}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-end text-gray-600">
            <button
              onClick={() =>
                toggleSaved(hasSaved, setHasSaved, user?.uid, postId)
              }
              className="flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-8 h-8"
            >
              {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
            </button>
            <Link
              to={`/deal/${postId}`}
              className="flex border hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-20 h-8"
            >
              <BiCommentDetail /> {comments}{" "}
            </Link>
            {!voucherCode && (
              <button className="flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-32 h-8">
                <a
                  className="flex gap-2 items-center"
                  href={dealLink}
                  target="_blank"
                >
                  Go to deal
                  <FiExternalLink />{" "}
                </a>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
