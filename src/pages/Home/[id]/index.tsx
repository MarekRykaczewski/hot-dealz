import { useEffect, useRef, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import {
  archiveDeal,
  checkSavedDeal,
  toggleSaved,
  updateDealDetails,
} from "../../../api/firebase/deals";
import { fetchProfileImageUrl } from "../../../api/firebase/storage";
import CommentSection from "../../../components/CommentSection";
import DealAboutSection from "../../../components/DealAboutSection";
import DealControls from "../../../components/DealControls";
import EditDealFormModal from "../../../components/DealControls/EditDealFormModal";
import DealCardDetailed from "../../../components/DealFull";
import DealMessage from "../../../components/DealMessage";
import { UserAuth } from "../../../context/AuthContext";
import { useDealDetails } from "../../../hooks/useDealDetails";
import { Deal } from "../../../types";

function DealDetails() {
  const { dealId } = useParams<{ dealId: string }>();
  const deal = useDealDetails(dealId || "");

  const currentDate = new Date();

  const [hasSaved, setHasSaved] = useState(false);
  const commentInput = useRef<HTMLTextAreaElement | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [isArchived, setIsArchived] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dealEndDate, setDealEndDate] = useState();
  const [dealStartDate, setDealStartDate] = useState();

  const { user } = UserAuth();
  const currentUserId = user?.uid;
  const isOwner = currentUserId === deal?.userId;

  useEffect(() => {
    if (deal && deal.endDate) {
      setDealEndDate(new Date(deal.endDate));
    }
  }, [deal]);

  useEffect(() => {
    if (deal && deal.startDate) {
      setDealStartDate(new Date(deal.startDate));
    }
  }, [deal]);

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

    if (dealEndDate < currentDate) {
      // Deal has expired, archive it
      if (dealId && !isArchived) {
        archiveDeal(dealId, true);
        setIsArchived(true);
      }
    }

    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, dealId);
    }
  }, [currentUserId, dealId, dealEndDate, isArchived]);

  return (
    <div className="mb-2 h-full max-w-4xl flex flex-col ml-auto mr-auto items-center justify-start">
      {isOwner && (
        <DealControls
          onEditClick={() => setIsEditModalOpen(true)}
          isArchived={isArchived}
          handleArchiveClick={handleArchiveClick}
        />
      )}
      {dealEndDate < currentDate && (
        <DealMessage
          icon={<RiErrorWarningLine size={32} color="red" />}
          message={`Deal has expired on ${deal.endDate}`}
        />
      )}
      {dealStartDate > currentDate && (
        <DealMessage
          icon={<RiErrorWarningLine size={32} color="red" />}
          message={`Deal will begin on ${deal.startDate}`}
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
          freeShipping={deal.freeShipping}
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
      <DealAboutSection
        commentInput={commentInput}
        deal={deal}
        user={user}
        hasSaved={hasSaved}
        setHasSaved={setHasSaved}
        dealId={dealId!}
        toggleSaved={toggleSaved}
      />
      <CommentSection commentInput={commentInput} postId={dealId!} />
    </div>
  );
}

export default DealDetails;
