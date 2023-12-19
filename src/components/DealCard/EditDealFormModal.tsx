import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../Modal";
import FormField from "../FormField";

interface EditDealFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialPrice?: number;
  initialNextBestPrice?: number;
  initialShippingCost?: number;
  initialDealLink?: string;
  initialVoucherCode?: string;
  onSave: (data: FormData) => void;
}

interface FormData {
  title: string;
  price: number;
  nextBestPrice: number;
  shippingCost: number;
  dealLink: string;
  voucherCode: string;
}

const EditDealFormModal: React.FC<EditDealFormModalProps> = ({
  isOpen,
  onClose,
  initialTitle = "",
  initialPrice = 0,
  initialNextBestPrice = 0,
  initialShippingCost = 0,
  initialDealLink = "",
  initialVoucherCode = "",
  onSave,
}: EditDealFormModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: initialTitle,
      price: initialPrice,
      nextBestPrice: initialNextBestPrice,
      shippingCost: initialShippingCost,
      dealLink: initialDealLink,
      voucherCode: initialVoucherCode,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const filteredData: FormData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );

    if (Object.keys(filteredData).length > 0) {
      onSave(filteredData);
      onClose();
    } else {
      onClose();
    }
  };

  const formFields = [
    {
      label: "Title (at most 100 characters)",
      name: "title",
      maxLength: 100,
      errorMessage: errors.title?.message,
    },
    {
      label: "Price (must be a valid number)",
      name: "price",
      validate: (value) =>
        !isNaN(parseFloat(value)) || "Price must be a valid number",
      errorMessage: errors.price?.message,
    },
    {
      label: "Next Best Price (optional)",
      name: "nextBestPrice",
      validate: (value) =>
        !isNaN(parseFloat(value)) || "Next Best Price must be a valid number",
      errorMessage: errors.nextBestPrice?.message,
    },
    {
      label: "Shipping Cost (optional)",
      name: "shippingCost",
      validate: (value) =>
        !isNaN(parseFloat(value)) || "Shipping Cost must be a valid number",
      errorMessage: errors.shippingCost?.message,
    },
    { label: "Deal Link (optional)", name: "dealLink" },
    { label: "Voucher Code (optional)", name: "voucherCode" },
  ];

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="text-gray-900 font-bold text-3xl mb-2">
        Edit Deal Details
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <FormField key={field.name} {...field} control={control} />
        ))}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditDealFormModal;
