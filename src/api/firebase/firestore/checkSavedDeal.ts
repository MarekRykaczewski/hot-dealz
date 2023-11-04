import { collection, doc, getDoc } from "firebase/firestore";
import { SetStateAction } from "react";
import { db } from "../../../config/firebase";

export const checkSavedDeal = async (
  setHasSaved: {
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  userId: string,
  postId: string | undefined
) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedDealRef = doc(savedRef, postId);

  const savedDeal = await getDoc(savedDealRef);
  setHasSaved(savedDeal.exists());
};
