import { useEffect, useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  archiveDeal,
  checkSavedDeal,
  toggleSaved,
  updateDealDetails,
} from "../../../api/firebase/firestore";
import { fetchProfileImageUrl } from "../../../api/firebase/storage";
import CommentSection from "../../../components/CommentSection";
import DealCardControls from "../../../components/DealCard/DealCardControls";
import DealCardDetailed from "../../../components/DealCard/DealCardDetailed";
import EditDealFormModal from "../../../components/DealCard/EditDealFormModal";
import { UserAuth } from "../../../context/AuthContext";
import { useDealDetails } from "../../../hooks/useDealDetails";
import { Deal } from "../../../types";

function DealDetails() {
  const [hasSaved, setHasSaved] = useState(false);
  const commentInput = useRef<HTMLTextAreaElement | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [isArchived, setIsArchived] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { dealId } = useParams<{ dealId: string }>();
  const deal = useDealDetails(dealId || "");
  const { user } = UserAuth();
  const currentUserId = user?.uid;
  const isOwner = currentUserId === deal?.userId;

  const handleSaveChanges = async (editedDealDetails: Partial<Deal>) => {
    if (dealId) {
      console.log("handlesave");
      const success = await updateDealDetails(dealId, editedDealDetails);
      if (success) {
        setIsEditModalOpen(false);
      }
    }
  };

  const handleArchiveClick = async () => {
    if (dealId) {
      const success = await archiveDeal(dealId, isArchived);
      if (success) {
        setIsArchived((prevIsArchived) => !prevIsArchived);
      }
    }
  };

  const fetchProfileImageData = async () => {
    if (deal?.userId) {
      const imageUrl = await fetchProfileImageUrl(deal.userId);
      if (imageUrl) {
        setProfileUrl(imageUrl);
      }
    }
  };

  useEffect(() => {
    fetchProfileImageData();
  }, [deal]);

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

  return (
    <div className="mb-2 h-full w-full flex flex-col ml-auto mr-auto items-center justify-start">
      {isOwner && (
        <DealCardControls
          onEditClick={() => setIsEditModalOpen(true)}
          isArchived={isArchived}
          handleArchiveClick={handleArchiveClick}
        />
      )}
      {deal && (
        <DealCardDetailed
          dealId={dealId!}
          title={deal.title}
          dealLink={deal.dealLink}
          owner={deal.owner}
          price={deal.price}
          nextBestPrice={deal.nextBestPrice}
          posted={deal.posted}
          shippingCost={deal.shippingCost}
          voucherCode={deal.voucherCode}
          profileUrl={profileUrl}
          imageURLs={deal.imageURLs}
          isArchived={isArchived}
        />
      )}
      <EditDealFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialTitle={deal?.title}
        initialPrice={deal?.price}
        initialNextBestPrice={deal?.nextBestPrice}
        initialShippingCost={deal?.shippingCost}
        initialDealLink={deal?.dealLink}
        initialVoucherCode={deal?.voucherCode}
        onSave={handleSaveChanges}
      />
      <div className="flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg">
        <div className="p-5">
          <h1 className="font-bold">About this deal</h1>
          <p className="text-gray-700 text-base">{deal?.description}</p>
        </div>
        <div className="bg-orange-500 flex gap-4 w-full rounded-b-lg px-6 py-3 overflow-hidden">
          <button
            onClick={() => commentInput.current?.focus()}
            className="flex flex-row-reverse gap-2 items-center justify-center hover:text-white transition"
          >
            New comment <BiCommentDetail />
          </button>
          <button
            onClick={() => {
              if (!user) return;
              toggleSaved(hasSaved, setHasSaved, user.uid, dealId!);
            }}
            className="flex flex-row-reverse gap-2 items-center justify-center hover:text-white transition"
          >
            Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
      </div>
      <CommentSection commentInput={commentInput} postId={dealId!} />
    </div>
  );
}

export default DealDetails;
