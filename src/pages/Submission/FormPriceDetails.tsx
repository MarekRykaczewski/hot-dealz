import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../../types";
import Tooltip from "./Tooltip";

interface FormPriceDetailsProps {
  formDetails: FormDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Replace with the correct type
  handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Replace with the correct type
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

  // Decimal validation object
  const decimalValidation = {
    decimal: (value: string) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Invalid decimal value";
    },
  };

  const handleFreeShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const shippingCostValue = isChecked ? 0 : formDetails.shippingCost;

    // Update the formDetails state using the provided function
    handleCheckChange(e);

    // Set the value and trigger re-validation
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
          {...register("price", {
            min: 0,
            max: {
              value: 9999999,
              message: "Are you sure it's THAT expensive? 🤔",
            },
            validate: {
              required: (value: number) => {
                if (!(value >= 0)) return "This is required";
              },
              ...decimalValidation,
            },
          })}
          name="price"
          value={formDetails.price}
          onChange={handleInputChange}
          step="0.01" // Specify step size to allow two decimal places
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
          {...register("nextBestPrice", {
            min: 0,
            max: {
              value: 9999999,
              message: "Are you sure it's THAT expensive? 🤔",
            },
            validate: {
              required: (value: number) => {
                if (!(value >= 0)) return "This is required";
              },
              notSmallerThanPrice: (value: number) => {
                const priceValue = formDetails.price || 0; // Default to 0 if price is not available
                if (value < priceValue)
                  return "Price can't be bigger than the next best price!";
              },
              ...decimalValidation,
            },
          })}
          name="nextBestPrice"
          value={formDetails.nextBestPrice}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          step="0.01" // Specify step size to allow two decimal places
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
          {...register("shippingCost", {
            min: 0,
            validate: {
              ...decimalValidation,
            },
          })}
          name="shippingCost"
          value={formDetails.freeShipping ? 0 : formDetails.shippingCost}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500"
          type="number"
          step="0.01" // Specify step size to allow two decimal places
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
