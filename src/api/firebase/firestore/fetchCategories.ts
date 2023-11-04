import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function fetchCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "itemCategories"));
    const categories = querySnapshot.docs.map((doc) => doc.data());
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
