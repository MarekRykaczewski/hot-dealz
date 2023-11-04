// Fetch deal comments

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const fetchComments = async (dealId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "deals", dealId, "comments")
    );

    const comments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const commentData = doc.data();
        const likesSnapshot = await getDocs(
          collection(db, "deals", dealId, "comments", doc.id, "likes")
        );
        const likes = likesSnapshot.docs.map((likeDoc) => likeDoc.data());
        return { id: doc.id, ...commentData, likes };
      })
    );

    return comments;
  } catch (err) {
    console.log(err);
    return [];
  }
};
