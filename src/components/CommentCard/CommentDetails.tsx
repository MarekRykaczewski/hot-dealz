interface CommentDetailsProps {
  comment: string;
  likes: number;
}

const CommentDetails: React.FC<CommentDetailsProps> = ({ comment, likes }) => {
  return (
    <div className="flex flex-col">
      {comment}
      <div
        className={`mt-5 ${likes > 0 ? "border-t" : ""} text-sm text-gray-500`}
      >
        {likes > 0 && `${likes} User${likes > 1 ? "s" : ""} have liked this`}
      </div>
    </div>
  );
};

export default CommentDetails;
