import React from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../../types";
import Tooltip from "./Tooltip";
import { descriptionValidation } from "../../utilities/validationRules";

interface FormDescriptionProps {
  formDetails: FormDetails;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  DESCRIPTION_CHARACTER_LIMIT: number;
}

function FormDescription({
  formDetails,
  handleInputChange,
  DESCRIPTION_CHARACTER_LIMIT,
}: FormDescriptionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-500 mb-2 mt-2">
          Description
        </h3>
        <span className="text-xs text-gray-500">
          {DESCRIPTION_CHARACTER_LIMIT - formDetails.description.length}{" "}
          Characters remaining
        </span>
      </div>

      <Tooltip
        text="Tell us about your deal"
        subtext="Include details about the product, links to any relevant info/reviews, and why you think it's a deal worth sharing"
      >
        <textarea
          {...register("description", descriptionValidation)}
          name="description"
          value={formDetails.description}
          onChange={handleInputChange}
          maxLength={DESCRIPTION_CHARACTER_LIMIT}
          className="block resize-none border rounded-md p-3 focus:outline-orange-500 w-full h-[300px]"
          placeholder="Here you can describe the deal in your own words and explain to other users why it is a good deal!"
        />
        <span className="text-sm text-red-500 mt-1">
          {errors.description?.message as any}
        </span>
      </Tooltip>
    </div>
  );
}

export default FormDescription;
