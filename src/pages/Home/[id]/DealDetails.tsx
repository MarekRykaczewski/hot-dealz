import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import CommentSection from "../../../components/CommentSection";
import DealCardDetailed from "../../../components/DealCard/DealCardDetailed";
import DealCardControls from "../../../components/DealCard/DealCardControls";
import EditDealFormModal from "../../../components/DealCard/EditDealFormModal";
import { auth } from "../../../config/firebase";
import { sortCommentsByNewest } from "../../../utils";
import {
  fetchDealData,
  fetchComments,
  fetchProfileImageById,
  archiveDeal,
  updateDealDetails,
  checkSavedDeal,
  toggleSaved,
} from "../../../api";
import { Deal } from "../../../types";

function DealDetails() {
  const currentUserId = auth.currentUser?.uid;
  const [hasSaved, setHasSaved] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [comments, setComments] = useState([]);
  const commentInput = useRef<HTMLInputElement | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { dealId } = useParams<{ dealId: string }>();

  const fetchData = async (dealId: string) => {
    const specificDeal = await fetchDealData(dealId);
    if (specificDeal) {
      setDeal(specificDeal);
      setIsArchived(specificDeal.archived || false);
    } else {
      setDeal(null);
    }
  };

  const fetchCommentsData = async () => {
    const commentsData = await fetchComments(dealId);
    sortCommentsByNewest(commentsData, setComments);
  };

  const handleSaveChanges = async (editedDealDetails: Partial<Deal>) => {
    if (dealId) {
      const success = await updateDealDetails(dealId, editedDealDetails);
      if (success) {
        setIsEditModalOpen(false);
      }
    }
  };

  const handleArchiveClick = async () => {
    if (dealId) {
      const success = await archiveDeal(dealId, !isArchived);
      if (success) {
        setIsArchived((prevIsArchived) => !prevIsArchived);
      }
    }
  };

  const fetchProfileImageData = async () => {
    if (currentUserId) {
      const imageUrl = await fetchProfileImageById(currentUserId);
      if (imageUrl) {
        setProfileUrl(imageUrl);
      }
    }
  };

  const formatDate = (date: any) => {
    return new Date(date.seconds * 1000).toLocaleString();
  };

  const formattedDateTime = deal?.posted ? formatDate(deal.posted) : "";

  useEffect(() => {
    fetchProfileImageData();
  }, [currentUserId]);

  useEffect(() => {
    if (dealId) fetchData(dealId);
  }, [dealId]);

  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, dealId);
    }
  }, [currentUserId, dealId]);

  useEffect(() => {
    if (deal?.archived !== undefined) {
      setIsArchived(deal.archived);
    }
  }, [deal]);

  const isOwner = currentUserId === deal?.userId;

  return (
    <div className="bg-slate-200 h-screen w-full flex flex-col ml-auto mr-auto items-center justify-start">
      {isOwner && (
        <DealCardControls
          onEditClick={() => setIsEditModalOpen(true)}
          isArchived={isArchived}
          handleArchiveClick={handleArchiveClick}
        />
      )}
      {deal && (
        <DealCardDetailed
          dealId={dealId || ""}
          title={deal.title || ""}
          dealLink={deal.dealLink || ""}
          owner={deal.owner || ""}
          price={deal.price || 0}
          nextBestPrice={deal.nextBestPrice || 0}
          posted={formattedDateTime}
          shippingCost={deal.shippingCost || 0}
          voucherCode={deal.voucherCode || ""}
          profileUrl={profileUrl}
          imageURLs={deal.imageURLs || []}
          isArchived={isArchived}
        />
      )}
      <EditDealFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialTitle={deal?.title || ""}
        initialPrice={deal?.price || 0}
        initialNextBestPrice={deal?.nextBestPrice || 0}
        initialShippingCost={deal?.shippingCost || 0}
        initialDealLink={deal?.dealLink || ""}
        initialVoucherCode={deal?.voucherCode || ""}
        onSave={handleSaveChanges}
      />
      <div className="flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg">
        <div className="p-5">
          <h1 className="font-bold">About this deal</h1>
          <p className="text-gray-700 text-base">{deal?.description || ""}</p>
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
              toggleSaved(hasSaved, setHasSaved, currentUserId, dealId || "")
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
