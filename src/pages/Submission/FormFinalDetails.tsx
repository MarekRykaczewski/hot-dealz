import React from "react";
import { FormDetails } from "../../types";
import CategorySelector from "./FormCategorySelector";

interface FormFinalDetailsProps {
  formDetails: FormDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormFinalDetails({ handleInputChange }: FormFinalDetailsProps) {
  return (
    <div>
      <div className="mb-1">
        <hr className="mb-4 mt-4" />

        <h3 className="text-2xl font-bold mb-4">Final details</h3>

        <span className="text-sm font-bold text-gray-500">Categories</span>
        <span className="text-xs text-gray-500 mb-3">
          Which of these categories best describes your deal?
        </span>
      </div>

      <div className="mb-2">
        <CategorySelector handleInputChange={handleInputChange} />
      </div>
    </div>
  );
}

export default FormFinalDetails;
