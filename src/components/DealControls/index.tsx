import React from "react";
import { BsHourglassBottom, BsPencil } from "react-icons/bs";

interface DealControlsProps {
  isArchived: boolean;
  handleArchiveClick: () => void;
  onEditClick: () => void;
}

const DealControls: React.FC<DealControlsProps> = ({
  isArchived,
  handleArchiveClick,
  onEditClick,
}) => {
  return (
    <div className="p-6 flex justify-between w-full bg-white rounded-lg mt-3">
      <div className="flex gap-3 items-center">
        <h1 className="text-xl font-bold"> Status </h1>
        <span
          className={`${
            !isArchived
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } px-3 rounded-full transition-all duration-300`}
        >
          {!isArchived ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 text-slate-800 hover:text-orange-600 transition-colors duration-300"
        >
          <BsPencil size={"1.2em"} /> Edit
        </button>
        <button
          onClick={handleArchiveClick}
          className="flex items-center gap-2 text-slate-800 hover:text-orange-600 transition-colors duration-300"
        >
          <span className="rotate">
            <BsHourglassBottom size={"1.2em"} />
          </span>
          {!isArchived ? "Archive" : "Renew"}
        </button>
      </div>
    </div>
  );
};

export default DealControls;
