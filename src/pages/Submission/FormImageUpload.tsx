import React from "react";
import ImagesUpload from "./ImagesUpload";
import { FormDetails } from "../../types";

interface FormImageUploadProps {
  formDetails: FormDetails;
  setFormDetails: React.Dispatch<React.SetStateAction<any>>;
}

function FormImageUpload({
  formDetails,
  setFormDetails,
}: FormImageUploadProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">The essentials</h1>

      <h3 className="text-sm font-bold text-gray-500 mb-2">Gallery</h3>
      <div className="flex sm:flex-row justify-around flex-col p-3 border-2 border-dashed rounded-md w-full h-[200px] mb-4">
        <div className="w-full">
          <span>Make your deal stand out with images</span>
          <p className="text-xs text-gray-500">
            Upload up to 3 images to publish your deal.
          </p>
        </div>
        <ImagesUpload
          size={3}
          formDetails={formDetails}
          setFormDetails={setFormDetails}
        />
      </div>
    </div>
  );
}

export default FormImageUpload;
