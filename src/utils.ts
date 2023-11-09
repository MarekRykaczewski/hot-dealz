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

export const formatPostedDate = (posted: {
  seconds: number;
  nanoseconds: number;
}) => {
  const seconds = posted.seconds;
  const nanoseconds = posted.nanoseconds;

  if (seconds < 86400) {
    return `Deal shared ${Math.floor(seconds / 3600)} hours ago`;
  } else {
    const postedDate = new Date(seconds * 1000 + nanoseconds / 1000000);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return `Deal shared on ${postedDate.toLocaleDateString(
      "en-US",
      options as any
    )}`;
  }
};
