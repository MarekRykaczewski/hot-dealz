import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utilities/copyToClipboard";
import DealPrice from "../DealPrice";
import DealCardVotes from "../DealVotes";

interface DealDetailsProps {
  postId: string;
  archived: boolean;
  date: string;
  time: string;
  title: string;
  price: number;
  nextBestPrice: number;
  freeShipping?: boolean;
  shippingCost: number;
  voucherCode?: string;
  dealLink: string;
  description: string;
}

const DealDetails: React.FC<DealDetailsProps> = ({
  postId,
  archived,
  date,
  time,
  title,
  price,
  nextBestPrice,
  freeShipping,
  shippingCost,
  voucherCode,
  dealLink,
  description,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);

    setIsCopied(true);
    toast.success("Copied code to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-gray-600 flex justify-between">
        <DealCardVotes postId={postId} archived={archived} />
        <div className="flex gap-2 items-center">
          <AiOutlineClockCircle size={"1.6em"} />
          <div className="flex flex-col items-center">
            <span>
              {date}, {time}
            </span>
          </div>
        </div>
      </div>

      <Link to={`/deal/${postId}`}>
        <div className="text-gray-900 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xl hover:text-orange-500 transition">
          {title}
        </div>
      </Link>

      <DealPrice
        price={price}
        nextBestPrice={nextBestPrice}
        shippingCost={shippingCost}
        freeShipping={freeShipping}
        textSize="xl"
      />
      {voucherCode && (
        <div className="mb-2 mt-2 flex gap-3 w-full text-gray-60">
          <button
            value={voucherCode}
            onClick={(e) => handleCopyToClipboard(e.currentTarget.value)}
            className="flex overflow-hidden text-ellipsis whitespace-nowrap border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8"
          >
            {isCopied ? "Copied!" : voucherCode} <BiCopyAlt size={20} />
          </button>
          <button className="flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-full h-8">
            <a
              className="flex gap-2 items-center "
              href={dealLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to deal
              <FiExternalLink />
            </a>
          </button>
        </div>
      )}
      <p
        className={`text-gray-700 w-full overflow-hidden whitespace-nowrap text-ellipsis mb-3`}
      >
        {description}
      </p>
    </div>
  );
};

export default DealDetails;
