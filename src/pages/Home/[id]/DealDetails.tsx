import { useEffect, useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { fetchComments } from "../../../api/firebase/deals";
import {
  archiveDeal,
  checkSavedDeal,
  toggleSaved,
  updateDealDetails,
} from "../../../api/firebase/firestore";
import { fetchProfileImageById } from "../../../api/firebase/users";
import CommentSection from "../../../components/CommentSection";
import DealCardControls from "../../../components/DealCard/DealCardControls";
import DealCardDetailed from "../../../components/DealCard/DealCardDetailed";
import EditDealFormModal from "../../../components/DealCard/EditDealFormModal";
import { useDealDetails } from "../../../hooks/useDealDetails";
import { Comment, Deal } from "../../../types";
import { sortCommentsByNewest } from "../../../utils";

interface Props {
  currentUserId?: string;
}

function DealDetails({ currentUserId }: Props) {
  const [hasSaved, setHasSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const commentInput = useRef<HTMLTextAreaElement | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [isArchived, setIsArchived] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { dealId } = useParams<{ dealId: string }>();
  const deal = useDealDetails(dealId || "");

  const fetchCommentsData = async () => {
    if (!dealId) return;
    const commentsData = await fetchComments(dealId);
    console.log(commentsData);
    const sortedComments = sortCommentsByNewest(commentsData);
    setComments(sortedComments);
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

  useEffect(() => {
    fetchProfileImageData();
  }, [currentUserId]);

  useEffect(() => {
    if (!dealId) return;
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, dealId);
    }
  }, [currentUserId, dealId]);

  useEffect(() => {
    if (deal?.archived !== undefined) {
      setIsArchived(deal.archived);
    }
  }, [deal]);

  useEffect(() => {
    fetchCommentsData();
  }, [dealId]);

  const isOwner = currentUserId === deal?.userId;

  return (
    <div className="bg-slate-200 h-screen w-full flex flex-col ml-auto mr-auto items-center justify-start">
      {!isOwner && (
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
          posted={formatDate(deal.posted)}
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
            onClick={() => {
              if (!currentUserId) return;
              toggleSaved(hasSaved, setHasSaved, currentUserId, dealId || "");
            }}
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
