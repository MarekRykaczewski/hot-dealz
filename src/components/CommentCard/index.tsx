import useComment from "../../hooks/useComment";
import LikeButton from "../ui/LikeButton";
import CommentDetails from "./CommentDetails";
import UserDetails from "./UserDetails";

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
  const { username, profileUrl, liked, likes, handleToggleLike } = useComment(
    userId,
    postId,
    commentId
  );

  return (
    <div className="border border-gray-400 border-t-1 border-b-0 border-l-0 border-r-0 w-full">
      <div className="flex flex-col p-6">
        <div className="flex mb-3 justify-between">
          <UserDetails
            username={username}
            profileUrl={profileUrl}
            date={date}
          />
          <LikeButton liked={liked} onClick={handleToggleLike} likes={likes} />
        </div>
        <CommentDetails comment={comment} likes={likes} />
      </div>
    </div>
  );
}

export default CommentCard;
