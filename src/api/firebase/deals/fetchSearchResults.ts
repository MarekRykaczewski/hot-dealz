import { collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../config/firebase";

export async function fetchSearchResults(searchQuery: string) {
  const dealsRef = collection(db, "deals");
  const lowercaseQuery = searchQuery.toLowerCase();
  const q = query(dealsRef);

  try {
    const querySnapshot = await getDocs(q);
    let results: any[] = [];

    if (lowercaseQuery.trim() !== "") {
      results = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const dealData = doc.data();
          const likesSnapshot = await getDocs(
            collection(dealsRef, doc.id, "likes")
          );
          const dislikesSnapshot = await getDocs(
            collection(dealsRef, doc.id, "dislikes")
          );
          const likesCount = likesSnapshot.size;
          const dislikesCount = dislikesSnapshot.size;

          let imageURL;

          if (dealData.imageURLs) {
            const imagePath = Array.isArray(dealData.imageURLs)
              ? dealData.imageURLs[0] // First element of the array
              : dealData.imageURLs; // String value

            const storageRef = ref(storage, imagePath);

            try {
              imageURL = await getDownloadURL(storageRef);
            } catch (error) {
              console.error("Error fetching image download URL:", error);
            }
          }

          return {
            id: doc.id,
            data: {
              ...dealData,
              likesCount,
              dislikesCount,
              imageURL,
            },
          };
        })
      );

      results = results
        .filter((result) =>
          result.data.title.toLowerCase().includes(lowercaseQuery)
        )
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .slice(0, 5); // Extract only the first 5 results
    }

    return results;
  } catch (error) {
    console.error("Error searching for deals:", error);
    return [];
  }
}
