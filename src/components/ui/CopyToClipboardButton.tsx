import React, { useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utilities/copyToClipboard";

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  text,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    copyToClipboard(text);
    setIsCopied(true);
    toast.success("Copied code to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      value={text}
      onClick={handleCopyToClipboard}
      className="flex border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
    >
      {isCopied ? "Copied!" : text} <BiCopyAlt size={20} />
    </button>
  );
};

export default CopyToClipboardButton;
