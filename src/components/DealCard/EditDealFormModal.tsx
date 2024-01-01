import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Modal from "../Modal";

import {
  titleValidation,
  priceValidation,
  nextBestPriceValidation,
  shippingCostValidation,
  dealLinkValidation,
} from "../../utilities/validationRules";

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
  initialTitle,
  initialPrice,
  initialNextBestPrice,
  initialShippingCost,
  initialDealLink,
  initialVoucherCode,
  onSave,
}: EditDealFormModalProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Set initial values using setValue
  React.useEffect(() => {
    setValue("title", initialTitle || "");
    setValue("price", initialPrice || 0);
    setValue("nextBestPrice", initialNextBestPrice || 0);
    setValue("shippingCost", initialShippingCost || 0);
    setValue("dealLink", initialDealLink || "");
    setValue("voucherCode", initialVoucherCode || "");
  }, [initialTitle, initialDealLink, initialVoucherCode, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSave(data);
    onClose();
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
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
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
            rules={titleValidation}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
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
            rules={priceValidation}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nextBestPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Next Best Price
          </label>
          <Controller
            name="nextBestPrice"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
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
            rules={nextBestPriceValidation}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="shippingCost"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping Cost
          </label>
          <Controller
            name="shippingCost"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
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
            rules={shippingCostValidation}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dealLink"
            className="block text-sm font-medium text-gray-700"
          >
            Deal Link
          </label>
          <Controller
            name="dealLink"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.dealLink ? "border-red-500" : ""
                  }`}
                />
                {errors.dealLink && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dealLink.message}
                  </p>
                )}
              </>
            )}
            rules={dealLinkValidation}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="voucherCode"
            className="block text-sm font-medium text-gray-700"
          >
            Voucher Code
          </label>
          <Controller
            name="voucherCode"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className={`mt-1 p-2 block w-full border rounded-md focus:ring-orange-500 focus:border-orange-500 ${
                    errors.voucherCode ? "border-red-500" : ""
                  }`}
                />
                {errors.voucherCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.voucherCode.message}
                  </p>
                )}
              </>
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
