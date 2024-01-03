// Update deal details

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Deal } from "../../../types";

export const updateDealDetails = async (
  dealId: string,
  editedDealDetails: Partial<Deal>
) => {
  try {
    const dealRef = doc(db, "deals", dealId);
    await updateDoc(dealRef, editedDealDetails);
    console.log("Deal details updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating deal details:", error);
    return false;
  }
};
