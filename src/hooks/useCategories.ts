import { useEffect, useState } from "react";
import { fetchCategories } from "../api/firebase/firestore";
import { Category } from "../types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      const transformedCategories: Category[] = data.map((doc) => ({
        id: doc.id,
        title: doc.title,
      }));
      setCategories(transformedCategories);
    };

    fetchData();
  }, []);

  return { categories };
}
