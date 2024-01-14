import { Comment } from "../types";
import { sortCommentsByLikes, sortCommentsByNewest } from "../utils";

export const sortComments = (
  comments: Comment[],
  selectedSort: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
) => {
  if (selectedSort === "Newest first") {
    const sortedComments = sortCommentsByNewest(comments);
    setComments(sortedComments);
  } else if (selectedSort === "Most liked") {
    sortCommentsByLikes(comments, setComments);
  }
};

export const formatDate = (date: { seconds: number }) => {
  return new Date(date.seconds * 1000).toLocaleString();
};
