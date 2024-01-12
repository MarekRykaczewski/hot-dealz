// Submit deal

import { User } from "firebase/auth";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../config/firebase";
import { UserData } from "../../../context/AuthContext";

interface SubmitDealResult {
  success: boolean;
  newDocId?: string | null; // Use optional chaining to handle potential absence
}

export const submitDeal = async (
  formData: {
    dealLink: any;
    images: any;
    title: any;
    description: any;
    price: any;
    nextBestPrice: any;
    freeShipping?: boolean;
    shippingCost: any;
    voucherCode: any;
    category: any;
    startDate: any;
    endDate: any;
  },
  userData: UserData,
  user: User | null
): Promise<SubmitDealResult> => {
  try {
    const dealsCollection = collection(db, "deals");
    const newDocRef = doc(dealsCollection);
    const newDocId = newDocRef.id;

    await setDoc(newDocRef, {
      owner: userData.username,
      dealLink: formData.dealLink,
      title: formData.title,
      description: formData.description,
      freeShipping: formData.freeShipping,
      price: formData.price,
      nextBestPrice: formData.nextBestPrice,
      posted: serverTimestamp(),
      category: formData.category,
      voucherCode: formData.voucherCode,
      shippingCost: formData.shippingCost,
      startDate: formData.startDate,
      endDate: formData.endDate,
      userId: user!.uid,
    });

    await submitImages(newDocId, formData.images);

    return { success: true, newDocId }; // Submission successful with the new document ID
  } catch (error) {
    console.error("Error submitting deal:", error);
    return { success: false }; // Submission failed
  }
};

const submitImages = async (docId: string, images: any[]) => {
  const imageURLs = [];

  for (let i = 0; i < images.length; i++) {
    if (images[i]) {
      const imageRef = ref(storage, `images/${docId}/${i}`);
      await uploadBytes(imageRef, images[i]);
      const imageURL = `/images/${docId}/${i}`;
      imageURLs.push(imageURL);
    }
  }

  // After uploading all images, update the deal document with imageURLs
  const dealDocRef = doc(db, "deals", docId);
  await updateDoc(dealDocRef, { imageURLs });
};
