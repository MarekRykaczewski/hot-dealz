import React, { useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utilities/copyToClipboard";

interface ShareDropdownProps {
  dealLink: string;
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({
  dealLink,
  isOpen,
  onClose,
  shareButtonRef,
}) => {
  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      dealLink
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      dealLink
    )}&text=${encodeURIComponent("Check this out! ")}`;
    window.open(shareUrl, "_blank");
  };

  const handleCopyLink = () => {
    copyToClipboard(dealLink);
    toast.success("Copied link to clipboard");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;

      const target = event.target as Node;
      const dropdownContainer = document.querySelector(
        ".share-dropdown-container"
      );
      const button = document.querySelector(".share-button");

      if (
        !target.closest(".share-dropdown-container") &&
        dropdownContainer &&
        !dropdownContainer.contains(target) &&
        !(button && button.contains(target))
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`${
        isOpen
          ? "absolute share-dropdown-container overflow-hidden w-full font-bold top-full left-0 mt-2 bg-white border rounded-lg shadow-md"
          : "hidden"
      }`}
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
  );
};

export default ShareDropdown;
