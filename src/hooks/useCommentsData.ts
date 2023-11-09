import { useEffect, useState } from "react";
import { fetchComments } from "../api/firebase/deals";
import { Comment } from "../types";
import { sortCommentsByNewest } from "../utils";

export function useCommentsData(dealId: string | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (dealId) {
        const commentsData = await fetchComments(dealId);
        const sortedComments = sortCommentsByNewest(commentsData);
        setComments(sortedComments);
      }
    }

    fetchData();
  }, [dealId]);

  return { comments, setComments };
}
