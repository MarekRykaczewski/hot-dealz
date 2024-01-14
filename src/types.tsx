import { DocumentData } from "firebase/firestore";

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
    nanoseconds: number;
  };
  userId: string;
  comments?: number;
  shippingCost: number;
  imageURLs: string[];
  archived: boolean;
  category: string;
  voucherCode?: string;
  freeShipping?: boolean;
  startDate?: string;
  endDate?: string;
};

export type Comment = {
  id: string;
  userId: string;
  comment: string;
  posted: { seconds: number; nanoseconds?: number };
  likes?: DocumentData[];
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
  startDate: string;
  endDate: string;
};

export type Category = {
  id: string;
  title: string;
};

export type Slide = {
  url: string;
};
