export type FormDetails = {
  dealLink: string;
  images: File[];
  title: string;
  description: string;
  price: number | string;
  nextBestPrice: number | string;
  freeShipping: boolean;
  shippingCost: number | string;
  voucherCode: string;
  category: string;
};
