// FormPriceDetails.tsx
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../../types";
import Tooltip from "./Tooltip";
import {
  priceValidation,
  nextBestPriceValidation,
  shippingCostValidation,
} from "../../utilities/validationRules";

interface FormPriceDetailsProps {
  formDetails: FormDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormPriceDetails({
  formDetails,
  handleInputChange,
  handleCheckChange,
}: FormPriceDetailsProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleFreeShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const shippingCostValue = isChecked ? 0 : formDetails.shippingCost;

    handleCheckChange(e);

    setValue("shippingCost", shippingCostValue, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    setValue(
      "shippingCost",
      formDetails.freeShipping ? 0 : formDetails.shippingCost
    );
  }, [formDetails, setValue]);

  return (
    <div className="grid grid-cols-2 overflow-hidden items-center gap-2">
      <label className="text-sm font-bold text-gray-500 mt-1" htmlFor="price">
        Price
      </label>
      <Tooltip
        text={"Tell us the price"}
        subtext={"This should be the total price after any discounts"}
      >
        <input
          {...register("price", priceValidation)}
          name="price"
          value={formDetails.price}
          onChange={handleInputChange}
          step="0.01"
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          type="number"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.price?.message as any}
        </span>
      </Tooltip>

      <label
        className="text-sm font-bold text-gray-500 mt-1"
        htmlFor="nextBestPrice"
      >
        Next best price
      </label>
      <Tooltip
        text={"Tell us the price"}
        subtext={"This should be the total price before any discounts"}
      >
        <input
          {...register("nextBestPrice", nextBestPriceValidation)}
          name="nextBestPrice"
          value={formDetails.nextBestPrice}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          step="0.01"
          type="number"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.nextBestPrice?.message as any}
        </span>
      </Tooltip>

      <label className="text-sm font-bold text-gray-500 mt-1" htmlFor="">
        Shipping cost
      </label>
      <div className="flex flex-col">
        <input
          {...register("shippingCost", shippingCostValidation)}
          name="shippingCost"
          value={formDetails.freeShipping ? 0 : formDetails.shippingCost}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500"
          type="number"
          step="0.01"
          min={0}
          disabled={formDetails.freeShipping ? true : false}
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.shippingCost?.message as any}
        </span>
      </div>

      <label className="text-sm font-bold text-gray-500 mt-1" htmlFor="">
        Free shipping?
      </label>
      <input
        {...register("freeShipping")}
        onChange={handleFreeShippingChange}
        type="checkbox"
        className="scale-150 overflow-hidden"
      />

      <label className="text-sm font-bold text-gray-500 mt-1" htmlFor="">
        Voucher Code
      </label>
      <input
        {...register("voucherCode")}
        name="voucherCode"
        value={formDetails.voucherCode}
        onChange={handleInputChange}
        className="border rounded-md p-1 focus:outline-orange-500 mb-3"
        type="text"
      />
    </div>
  );
}

export default FormPriceDetails;
