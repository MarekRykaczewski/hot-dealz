import React from "react";
import { FormDetails } from "../../types";

interface ImagesUploadProps {
  size: number;
  formDetails: FormDetails;
  setFormDetails: React.Dispatch<
    React.SetStateAction<{
      images: File[];
    }>
  >;
}

function ImagesUpload({
  size,
  formDetails,
  setFormDetails,
}: ImagesUploadProps) {
  const imageUploaderElements = [...Array(size)].map((_, i) => (
    <div
      key={i}
      className="relative flex items-end bg-slate-300 w-[100px] h-[100px] rounded-xl"
    >
      {(formDetails.images[i - 1] && !formDetails.images[i]) ||
      (i === 0 && formDetails.images.length === 0) ? (
        <label
          className="absolute text-center bg-orange-500 hover:bg-orange-400 transition text-white w-full rounded-b-xl"
          htmlFor={`img-${i}`}
        >
          Upload
        </label>
      ) : null}
      <input
        onChange={(e) => handleImageUpload(e)}
        className="hidden"
        id={`img-${i}`}
        type="file"
      />
      {formDetails.images[i] && (
        <img
          className="object-scale-down w-full h-full"
          alt="not found"
          src={URL.createObjectURL(formDetails.images[i])}
        />
      )}
      {formDetails.images[i] && (
        <button
          onClick={() => handleImageRemove(formDetails.images[i])}
          className="absolute flex items-center justify-center border text-center top-[-10px] right-[-10px] rounded-full text-white transition hover:bg-orange-400 bg-orange-500 w-6 h-6"
        >
          <span>&times;</span>
        </button>
      )}
    </div>
  ));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const copy = [...formDetails.images];
      copy.push(e.target.files[0]);
      setFormDetails({
        ...formDetails,
        images: copy,
      });
      e.target.value = "";
    }
  };

  const handleImageRemove = (file: File) => {
    const formImages = [...formDetails.images];
    const indexOfFile = formImages.findIndex(
      (fileObject) => fileObject === file
    );
    if (indexOfFile !== -1) {
      formImages.splice(indexOfFile, 1);
      setFormDetails({
        ...formDetails,
        images: [...formImages],
      });
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center w-full h-full">
        <div className="flex gap-3">{imageUploaderElements}</div>
      </div>
    </div>
  );
}

export default ImagesUpload;
