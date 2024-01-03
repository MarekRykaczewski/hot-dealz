import { FiThumbsUp } from "react-icons/fi";

interface LikeButtonProps {
  liked: boolean;
  onClick: () => void;
  likes: number;
}

function LikeButton({ liked, onClick, likes }: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`hover:text-orange-500 ${
        liked && "text-orange-500 font-bold"
      } cursor-pointer transition flex flex-row-reverse gap-2 items-center`}
    >
      <div> {liked ? "Liked" : "Like"}</div>
      <FiThumbsUp color={liked ? "orange" : "gray"} />
      {likes > 0 && <div>{likes}</div>}
    </button>
  );
}

export default LikeButton;
