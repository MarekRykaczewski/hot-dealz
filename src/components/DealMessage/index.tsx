import React from "react";

interface DealMessageProps {
  icon: React.ReactNode;
  message: string;
}

const DealMessage: React.FC<DealMessageProps> = ({ icon, message }) => {
  return (
    <div className="p-4 flex w-full text-xl items-center justify-center bg-white rounded-lg mt-3">
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default DealMessage;
