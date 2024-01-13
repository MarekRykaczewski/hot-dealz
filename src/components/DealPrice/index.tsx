import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";

interface PriceComponentProps {
  price: number;
  nextBestPrice: number;
  shippingCost: number;
  textSize?: string; // Optional prop for text size
}

const PriceComponent: React.FC<PriceComponentProps> = ({
  price,
  nextBestPrice,
  shippingCost,
  textSize = "3xl", // Default text size if not provided
}) => {
  const discountPercentage = Math.floor(
    ((nextBestPrice - price) / nextBestPrice) * 100
  );

  return (
    <div className="flex gap-3 items-center w-full">
      <p className={`text-orange-500 font-bold text-${textSize}`}>{price}zł</p>
      <del className={`text-gray-500 font-bold text-${textSize}`}>
        {nextBestPrice}zł
      </del>
      <p className={`text-${textSize}`}>-{discountPercentage}%</p>
      <p className="flex flex-row text-slate-500 gap-2 items-center ml-auto">
        <MdOutlineLocalShipping size={30} />
        {shippingCost ? "zl" : "Free Shipping"}
      </p>
    </div>
  );
};

export default PriceComponent;
