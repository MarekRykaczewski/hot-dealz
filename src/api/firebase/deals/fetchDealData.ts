import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const fetchDealData = async (dealId) => {
  try {
    const dealRef = doc(db, "deals", dealId);
    const dealSnapshot = await getDoc(dealRef);

    if (dealSnapshot.exists()) {
      const dealData = dealSnapshot.data();
      const commentsSnapshot = await getDocs(collection(dealRef, "comments"));
      const commentsCount = commentsSnapshot.size;
      return { id: dealSnapshot.id, ...dealData, comments: commentsCount };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
