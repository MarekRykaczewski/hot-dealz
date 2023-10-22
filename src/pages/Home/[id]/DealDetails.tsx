import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import CommentSection from "../../../components/CommentSection";
import DealCardDetailed from "../../../components/DealCard/DealCardDetailed";
import DealCardControls from "../../../components/DealCard/DealCardControls";
import EditDealFormModal from "../../../components/DealCard/EditDealFormModal";
import { auth } from "../../../config/firebase";
import { sortCommentsByNewest } from "../../../utils";
import { checkSavedDeal, toggleSaved } from "../../../api";
import {
  fetchDealData,
  fetchComments,
  fetchProfileImageById,
  archiveDeal,
  updateDealDetails,
} from "../../../api";

function DealDetails() {
  const currentUserId = auth.currentUser?.uid;
  const [hasSaved, setHasSaved] = useState(false);
  const [deal, setDeal] = useState<any>([]);
  const {
    title,
    imageURLs,
    userId,
    archived,
    posted,
    owner,
    price,
    nextBestPrice,
    description,
    shippingCost,
    dealLink,
    voucherCode,
  } = deal;
  const { dealId } = useParams<any>();
  const [comments, setComments] = useState([]);
  const commentInput = useRef<HTMLInputElement | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [isArchived, setIsArchived] = useState(archived);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (dealId: string) => {
    const specificDeal = await fetchDealData(dealId);
    if (specificDeal) {
      setDeal(specificDeal);
    } else {
      setDeal([]);
    }
  };

  const fetchCommentsData = async () => {
    const commentsData = await fetchComments(dealId);
    sortCommentsByNewest(commentsData, setComments);
  };

  const handleSaveChanges = async (editedDealDetails: any) => {
    const success = await updateDealDetails(dealId, editedDealDetails);
    if (success) {
      setIsEditModalOpen(false); // Close the modal after saving
    }
  };

  const handleArchiveClick = async () => {
    const success = await archiveDeal(dealId, archived);
    if (success) {
      setIsArchived((prevIsArchived: boolean) => !prevIsArchived);
    }
  };

  const fetchProfileImageData = async () => {
    const imageUrl = await fetchProfileImageById(currentUserId);
    if (imageUrl) {
      setProfileUrl(imageUrl);
    }
  };

  const formatDate = (date: any) => {
    return new Date(date.seconds * 1000).toLocaleString();
  };

  const formattedDateTime = posted && formatDate(posted);

  useEffect(() => {
    fetchProfileImageData();
  }, [currentUserId]);

  useEffect(() => {
    if (dealId) fetchData(dealId);
  }, []);

  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, dealId);
    }
  }, []);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  useEffect(() => {
    setIsArchived(archived);
  }, [archived]);

  const isOwner = currentUserId === userId;

  return (
    <div className="bg-slate-200 h-screen w-full flex flex-col ml-auto mr-auto items-center justify-start">
      {isOwner && (
        <DealCardControls
          onEditClick={() => setIsEditModalOpen(true)}
          isArchived={isArchived}
          handleArchiveClick={handleArchiveClick}
        />
      )}
      <DealCardDetailed
        dealId={dealId || ""}
        title={title}
        dealLink={dealLink}
        owner={owner}
        price={price}
        nextBestPrice={nextBestPrice}
        posted={formattedDateTime}
        shippingCost={shippingCost}
        voucherCode={voucherCode}
        profileUrl={profileUrl}
        imageURLs={imageURLs}
        isArchived={isArchived}
      />
      <EditDealFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialTitle={title}
        initialPrice={price}
        initialNextBestPrice={nextBestPrice}
        initialShippingCost={shippingCost}
        initialDealLink={dealLink}
        initialVoucherCode={voucherCode}
        onSave={handleSaveChanges}
      />
      <div className="flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg">
        <div className="p-5">
          <h1 className="font-bold">About this deal</h1>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="bg-slate-300 flex gap-4 w-full px-6 py-3">
          <button
            onClick={() => commentInput.current?.focus()}
            className="flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition"
          >
            New comment <BiCommentDetail />
          </button>
          <button
            onClick={() =>
              toggleSaved(hasSaved, setHasSaved, currentUserId, dealId)
            }
            className="flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition"
          >
            Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
      </div>
      <CommentSection
        commentInput={commentInput}
        postId={dealId || ""}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default DealDetails;
