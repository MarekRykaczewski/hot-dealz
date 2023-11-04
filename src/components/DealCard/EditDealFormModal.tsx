import React from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../Modal";

interface EditDealFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialPrice?: string;
  initialNextBestPrice?: string;
  initialShippingCost?: string;
  initialDealLink?: string;
  initialVoucherCode?: string;
  onSave: (data: FormData) => void;
}

interface FormData {
  [key: string]: string;
  title: string;
  price: string;
  nextBestPrice: string;
  shippingCost: string;
  dealLink: string;
  voucherCode: string;
}

const EditDealFormModal: React.FC<EditDealFormModalProps> = ({
  isOpen,
  onClose,
  initialTitle = "",
  initialPrice = "",
  initialNextBestPrice = "",
  initialShippingCost = "",
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

  const onSubmit = async (data: FormData) => {
    // Filter out fields with empty values before calling onSave
    const filteredData: FormData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {} as FormData);

    if (Object.keys(filteredData).length > 0) {
      onSave(filteredData);
      onClose();
      window.location.reload();
    } else {
      // Handle the case where no fields were updated or all were left empty
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="text-gray-900 font-bold text-3xl mb-2">
        Edit Deal Details
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title (at most 100 characters)
          </label>
          <Controller
            name="title"
            control={control}
            rules={{
              maxLength: {
                value: 100,
                message: "Title must be at most 100 characters",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  id="title"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (must be a valid number)
          </label>
          <Controller
            name="price"
            control={control}
            rules={{
              validate: (value) => {
                if (!value) return true; // Allow empty value
                return (
                  !isNaN(parseFloat(value)) || "Price must be a valid number"
                );
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  id="price"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nextBestPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Next Best Price (optional)
          </label>
          <Controller
            name="nextBestPrice"
            control={control}
            rules={{
              validate: (value) => {
                if (!value) return true; // Allow empty value
                return (
                  !isNaN(parseFloat(value)) ||
                  "Next Best Price must be a valid number"
                );
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  id="nextBestPrice"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.nextBestPrice ? "border-red-500" : ""
                  }`}
                />
                {errors.nextBestPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nextBestPrice.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="shippingCost"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping Cost (optional)
          </label>
          <Controller
            name="shippingCost"
            control={control}
            rules={{
              validate: (value) => {
                if (!value) return true; // Allow empty value
                return (
                  !isNaN(parseFloat(value)) ||
                  "Shipping Cost must be a valid number"
                );
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  id="shippingCost"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.shippingCost ? "border-red-500" : ""
                  }`}
                />
                {errors.shippingCost && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shippingCost.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dealLink"
            className="block text-sm font-medium text-gray-700"
          >
            Deal Link (optional)
          </label>
          <Controller
            name="dealLink"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="dealLink"
                {...field}
                className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500`}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="voucherCode"
            className="block text-sm font-medium text-gray-700"
          >
            Voucher Code (optional)
          </label>
          <Controller
            name="voucherCode"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="voucherCode"
                {...field}
                className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500`}
              />
            )}
          />
        </div>

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
