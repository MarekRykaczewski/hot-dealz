import { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import {
  checkUserLiked,
  fetchCommentLikeCount,
  getUsernameFromComment,
  toggleCommentLike,
} from "../api/firebase/comments";
import { getProfileUrlFromUserId } from "../api/firebase/users";
import { Link } from "react-router-dom";

interface CommentCardProps {
  userId: string;
  postId: string;
  commentId: string;
  comment: string;
  date: string;
}

function CommentCard({
  userId,
  postId,
  commentId,
  comment,
  date,
}: CommentCardProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const username = await getUsernameFromComment(commentId, postId);
        setUsername(username);

        const url = await getProfileUrlFromUserId(userId);
        setProfileUrl(url);

        const likeCount = await fetchCommentLikeCount(postId, commentId);
        setLikes(likeCount);

        // Check if the current user has liked the comment
        const userHasLiked = await checkUserLiked(postId, commentId, userId);
        setLiked(userHasLiked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [commentId, postId, userId]);

  // Function to toggle like on a comment
  const handleToggleCommentLike = async () => {
    try {
      // Toggle the like on the server
      await toggleCommentLike(postId, commentId, userId);

      // Update the liked state
      setLiked(!liked);

      // Update the like count
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    } catch (error) {
      // Handle any errors that occurred
      console.error("Error toggling comment like:", error);
    }
  };

  return (
    <div className="border border-gray-400 border-t-1 border-b-0 border-l-0 border-r-0 w-full">
      <div className="flex flex-col p-6">
        <div className="flex mb-3 justify-between">
          <Link to={`/profile/${username}`} className="flex">
            {profileUrl && (
              <img
                className="self-start w-10 h-10 rounded-full mr-4"
                src={profileUrl}
                alt={`Avatar of ${username || "Anonymous"}`}
              />
            )}
            <div className="flex flex-col">
              <span>{username || "Anonymous"}</span>
              <span>{date}</span>
            </div>
          </Link>
          <div>
            <button
              onClick={handleToggleCommentLike}
              className={`hover:text-orange-500 ${
                liked && "text-orange-500 font-bold"
              } cursor-pointer transition flex flex-row-reverse gap-2 items-center`}
            >
              <div> {liked ? "Liked" : "Like"}</div>
              <FiThumbsUp color={liked ? "orange" : "gray"} />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {comment}
          <div
            className={`mt-5 ${likes > 0 && "border-t"} text-sm text-gray-500`}
          >
            {likes > 0 &&
              `${likes} User${likes > 1 ? "s" : ""} have liked this`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
