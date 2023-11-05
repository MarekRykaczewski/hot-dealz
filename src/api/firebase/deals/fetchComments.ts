// Fetch deal comments

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Comment } from "../../../types";

export const fetchComments = async (dealId: string): Promise<Comment[]> => {
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
        return { id: doc.id, ...commentData, likes } as Comment;
      })
    );

    return comments;
  } catch (err) {
    console.log(err);
    return [];
  }
};
