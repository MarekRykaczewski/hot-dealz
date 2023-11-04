// Submit deal

import { User } from "firebase/auth";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { UserData } from "../../../context/AuthContext";

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
  },
  userData: UserData,
  user: User | null
) => {
  try {
    const dealsCollection = collection(db, "deals");
    const newDocRef = doc(dealsCollection);
    const newDocId = newDocRef.id;

    await setDoc(newDocRef, {
      owner: userData.username || "test",
      dealLink: formData.dealLink,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      nextBestPrice: formData.nextBestPrice,
      posted: serverTimestamp(),
      category: formData.category,
      voucherCode: formData.voucherCode,
      shippingCost: formData.shippingCost,
      userId: user.uid,
    });

    await submitImages(newDocId, formData.images);

    return true; // Submission successful
  } catch (error) {
    console.error("Error submitting deal:", error);
    return false; // Submission failed
  }
};
