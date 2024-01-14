import React from "react";

interface UserDealsProps {
  dealElements: React.ReactNode[];
}

const UserDeals: React.FC<UserDealsProps> = ({ dealElements }) => (
  <div className="flex flex-col items-start justify-center gap-2">
    {(dealElements.length > 0 && dealElements) || (
      <div className="text-2xl text-red-500 w-full bg-red-100 rounded-lg p-4 shadow-md text-center font-semibold mb-4">
        User hasn't shared any deals!
      </div>
    )}
  </div>
);

export default UserDeals;
