import { Comment, Deal } from "./types";

export const sortByNewest = (
  deals: Deal[],
  setDeals: (deals: Deal[]) => void
) => {
  const dealsCopy = [...deals];
  dealsCopy.sort((a, b) => {
    const timestampA = a.posted.seconds * 1000;
    const timestampB = b.posted.seconds * 1000;
    return timestampB - timestampA;
  });
  setDeals(dealsCopy);
};

export const sortByComments = (
  deals: Deal[],
  setDeals: (deals: Deal[]) => void
) => {
  const dealsCopy = [...deals];
  dealsCopy.sort((a, b) => {
    return b.comments - a.comments;
  });
  setDeals(dealsCopy);
};

export const sortCommentsByNewest = (comments: Comment[]) => {
  const commentsCopy = [...comments];
  commentsCopy.sort(
    (a, b) => b.posted.seconds * 1000 - a.posted.seconds * 1000
  );
  return commentsCopy;
};

export const sortCommentsByLikes = (
  comments: Comment[],
  setComments: (comments: Comment[]) => void
) => {
  const commentsCopy = [...comments];
  console.log(commentsCopy);
  commentsCopy.sort((a, b) => {
    const numLikesA = a.likes ? a.likes.length : 0;
    const numLikesB = b.likes ? b.likes.length : 0;
    return numLikesB - numLikesA;
  });
  setComments(commentsCopy);
};
