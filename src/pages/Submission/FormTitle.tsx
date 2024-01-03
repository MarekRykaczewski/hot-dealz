import React from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../../types";
import { titleValidation } from "../../utilities/validationRules";
import Tooltip from "./FormTooltip";

interface FormTitleProps {
  formDetails: FormDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  TITLE_CHARACTER_LIMIT: number;
}

function FormTitle({
  formDetails,
  handleInputChange,
  TITLE_CHARACTER_LIMIT,
}: FormTitleProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-500 mb-2"> Title </h3>
        <span className="text-xs text-gray-500">
          {TITLE_CHARACTER_LIMIT - formDetails.title.length} Characters
          remaining
        </span>
      </div>
      <Tooltip
        text={"Make your title stand out"}
        subtext={
          "Include the Brand, Product type, Color, and Model in your title (e.g. Nike Airforce 1 White)"
        }
      >
        <input
          {...register("title", titleValidation)}
          name="title"
          value={formDetails.title}
          onChange={handleInputChange}
          className="border rounded-md p-1 focus:outline-orange-500 w-full"
          type="text"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.title?.message as any}
        </span>
      </Tooltip>
    </div>
  );
}

export default FormTitle;
