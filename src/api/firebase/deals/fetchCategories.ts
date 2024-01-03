import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Category } from "../../../types";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "itemCategories"));
    const categories = querySnapshot.docs.map((doc) => doc.data() as Category);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
