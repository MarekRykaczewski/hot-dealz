export type Deal = {
  id: string;
  title: string;
  dealLink: string;
  owner: string;
  price: number;
  nextBestPrice: number;
  description: string;
  posted: {
    seconds: number;
  };
  userId: string;
  comments: number;
  shippingCost: number;
  imageURLs: string[];
  archived: boolean;
  category: string;
  voucherCode: string;
};

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
