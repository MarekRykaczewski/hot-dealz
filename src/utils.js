export const sortByNewest = (deals, setDeals) => {
  const dealsCopy = [...deals]
  dealsCopy.sort((a, b) => {
    const timestampA = a.posted.seconds * 1000
    const timestampB = b.posted.seconds * 1000
    return timestampB - timestampA;
  })
  setDeals(dealsCopy)
}

export const sortByComments = (deals, setDeals) => {
  const dealsCopy = [...deals];
  dealsCopy.sort((a, b) => {
    return b.comments - a.comments;
  });
  setDeals(dealsCopy);
};

export const sortCommentsByNewest = (comments, setComments) => {
  const commentsCopy = [...comments];
  commentsCopy.sort((a, b) => b.posted.toDate() - a.posted.toDate());
  setComments(commentsCopy);
}

export const sortCommentsByLikes = (comments, setComments) => {
  const commentsCopy = [...comments];
  console.log(commentsCopy)
  commentsCopy.sort((a, b) => {
    const numLikesA = a.likes ? a.likes.length : 0;
    const numLikesB = b.likes ? b.likes.length : 0;
    return numLikesB - numLikesA;
  });
  setComments(commentsCopy);
};