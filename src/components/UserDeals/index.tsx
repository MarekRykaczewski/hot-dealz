export const UserDeals = ({ dealElements }) => (
  <div className="sm:col-span-2">
    <h3 className="text-2xl bg-white rounded-lg p-4 shadow-md text-center font-semibold mb-4">
      User's Deals
    </h3>
    <div className="flex flex-col items-center justify-center gap-2">
      {(dealElements.length > 0 && dealElements) || (
        <div className="text-2xl text-red-500 w-full bg-red-100 rounded-lg p-4 shadow-md text-center font-semibold mb-4">
          User hasn't shared any deals!
        </div>
      )}
    </div>
  </div>
);
