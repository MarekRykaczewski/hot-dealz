import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";

interface PriceComponentProps {
  price: number;
  nextBestPrice: number;
  shippingCost: number;
}

const PriceComponent: React.FC<PriceComponentProps> = ({
  price,
  nextBestPrice,
  shippingCost,
}) => {
  const discountPercentage = Math.floor(
    ((nextBestPrice - price) / nextBestPrice) * 100
  );

  return (
    <div className="flex gap-3 items-center w-full">
      <p className="text-orange-500 font-bold text-3xl">{price}zł</p>
      <del className="text-gray-500 font-bold text-3xl">{nextBestPrice}zł</del>
      <p className="text-3xl">-{discountPercentage}%</p>
      <p className="flex flex-row text-xl text-slate-500 gap-2 items-center ml-auto">
        <MdOutlineLocalShipping size={30} />
        {shippingCost}zł
      </p>
    </div>
  );
};

export default PriceComponent;
