// Set deal to archived

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const archiveDeal = async (dealId: string, archived: boolean) => {
  try {
    const dealRef = doc(db, "deals", dealId);
    await updateDoc(dealRef, {
      archived: !archived, // Set 'archived' to true
    });
    return true;
  } catch (error) {
    console.error("Error archiving deal:", error);
    return false;
  }
};
