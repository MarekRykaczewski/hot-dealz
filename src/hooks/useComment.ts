import { useEffect, useState } from "react";
import {
  checkUserLiked,
  fetchCommentLikeCount,
  getUsernameFromComment,
  toggleCommentLike,
} from "../api/firebase/comments";
import { getProfileUrlFromUserId } from "../api/firebase/users";

function useComment(userId, postId, commentId) {
  const [username, setUsername] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchCommentData() {
      try {
        const fetchedUsername = await getUsernameFromComment(commentId, postId);
        setUsername(fetchedUsername);

        const url = await getProfileUrlFromUserId(userId);
        setProfileUrl(url);

        const likeCount = await fetchCommentLikeCount(postId, commentId);
        setLikes(likeCount);

        const userHasLiked = await checkUserLiked(postId, commentId, userId);
        setLiked(userHasLiked);
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    }

    fetchCommentData();
  }, [commentId, postId, userId]);

  const handleToggleLike = async () => {
    try {
      await toggleCommentLike(postId, commentId, userId);
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error("Error toggling comment like:", error);
    }
  };

  return {
    username,
    profileUrl,
    liked,
    likes,
    handleToggleLike,
  };
}

export default useComment;
