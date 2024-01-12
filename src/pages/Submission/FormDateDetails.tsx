import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../../types";
import Tooltip from "./FormTooltip";

interface FormDateDetailsProps {
  formDetails: FormDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormDateDetails({
  formDetails,
  handleInputChange,
}: FormDateDetailsProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue("startDate", formDetails.startDate);
    setValue("endDate", formDetails.endDate);
  }, [formDetails, setValue]);

  return (
    <div className="grid grid-cols-2 overflow-hidden items-center gap-2">
      <label
        className="text-sm font-bold text-gray-500 mt-1"
        htmlFor="startDate"
      >
        Start Date
      </label>
      <Tooltip
        text={"Select the start date"}
        subtext={"This is the date when the offer starts"}
      >
        <input
          {...register("startDate")}
          name="startDate"
          value={formDetails.startDate}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          type="date"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.startDate?.message as any}
        </span>
      </Tooltip>

      <label className="text-sm font-bold text-gray-500 mt-1" htmlFor="endDate">
        End Date
      </label>
      <Tooltip
        text={"Select the end date"}
        subtext={"This is the date when the offer ends"}
      >
        <input
          {...register("endDate")}
          name="endDate"
          value={formDetails.endDate}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          type="date"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.endDate?.message as any}
        </span>
      </Tooltip>
    </div>
  );
}

export default FormDateDetails;
