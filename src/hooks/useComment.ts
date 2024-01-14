import { useEffect, useState } from "react";
import {
  checkUserLiked,
  fetchCommentLikeCount,
  getUsernameFromComment,
  toggleCommentLike,
} from "../api/firebase/comments";
import { getProfileUrlFromUserId } from "../api/firebase/users";

interface CommentData {
  username: string | null;
  profileUrl: string | null;
  liked: boolean;
  likes: number;
  handleToggleLike: () => void;
}

function useComment(
  userId: string,
  postId: string,
  commentId: string
): CommentData {
  const [username, setUsername] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

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
