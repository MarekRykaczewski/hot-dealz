import React, { useCallback, useState } from "react";
import { MdCloudUpload } from "react-icons/md";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onDrop(files);
      setIsDragging(false); // Reset isDragging state after dropping files
    },
    [onDrop]
  );

  const handleFileInputClick = useCallback(() => {
    // Trigger the hidden file input when the user clicks on the dropzone
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        onDrop(Array.from(files));
      }
    },
    [onDrop]
  );

  const fileInputRef = React.createRef<HTMLInputElement>();

  return (
    <div
      className={`flex cursor-pointer flex-col p-2 items-center justify-center bg-gray-100 border-2 border-dashed ${
        isDragging ? "border-blue-500" : "" // Apply hover effect when dragging
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        handleDragEnter();
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleFileInputClick}
    >
      <p className="text-gray-700">Drag and drop an image file here or click</p>
      <MdCloudUpload color="gray" size={40} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default Dropzone;
