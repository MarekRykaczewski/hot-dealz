import React from "react";
import { CiShare2 } from "react-icons/ci";
import DealCardVotes from "../DealVotes";
import ShareDropdown from "./ShareDropdown";

interface DealActionsProps {
  dealId: string;
  isArchived: boolean;
  shareButtonRef: React.RefObject<HTMLButtonElement>;
  handleShareButtonClick: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dealLink: string;
}

const DealActions: React.FC<DealActionsProps> = ({
  dealId,
  isArchived,
  shareButtonRef,
  handleShareButtonClick,
  isDropdownOpen,
  setIsDropdownOpen,
  dealLink,
}) => {
  return (
    <div className="flex w-full gap-2 items-center justify-between">
      <div className="w-1/2">
        <DealCardVotes postId={dealId} archived={isArchived} />
      </div>
      <div className="relative flex justify-end w-1/2">
        <button
          ref={shareButtonRef}
          onClick={handleShareButtonClick}
          className="flex share-button gap-2 font-bold border w-full hover:bg-gray-100 transition items-center justify-center rounded-full h-8"
        >
          <CiShare2 size={24} />
          Share
        </button>
        <ShareDropdown
          dealLink={dealLink}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
        />
      </div>
    </div>
  );
};

export default DealActions;
