import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export async function getLikesAndDislikes(postId: string) {
  const likesCollection = collection(db, "deals", postId, "likes");
  const dislikesCollection = collection(db, "deals", postId, "dislikes");

  const likesData = await getDocs(likesCollection);
  const dislikesData = await getDocs(dislikesCollection);

  return {
    likes: likesData.docs,
    dislikes: dislikesData.docs,
  };
}
