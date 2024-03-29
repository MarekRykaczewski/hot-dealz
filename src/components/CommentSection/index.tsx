import { ChangeEvent, RefObject, useState } from "react";
import { submitComment } from "../../api/firebase/comments";
import { UserAuth } from "../../context/AuthContext";
import { useCommentsData } from "../../hooks/useCommentsData";
import { formatDate, sortComments } from "../../utilities/commentUtils";
import {
  COMMENT_SORT_OPTIONS,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../utilities/constants";
import CommentCard from "../CommentCard";

interface CommentSectionProps {
  postId: string;
  commentInput: RefObject<HTMLTextAreaElement>;
}

function CommentSection({ postId, commentInput }: CommentSectionProps) {
  const { user, userData } = UserAuth();
  const { comments, setComments } = useCommentsData(postId);
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    sortComments(comments, selectedSort, setComments);
  };

  const commentElements = comments.map((comment) => {
    return (
      <CommentCard
        key={comment.id}
        commentId={comment.id}
        userId={comment.userId}
        postId={postId}
        comment={comment.comment}
        date={formatDate(comment.posted)}
      />
    );
  });

  const handleSubmitComment = async () => {
    if (!user) return;
    if (comment.trim() === "") {
      return;
    }

    const newComment = {
      userId: user.uid,
      comment: comment,
    };

    const updatedComments = await submitComment(postId, newComment);

    setComments(updatedComments as any);
    setComment("");
  };

  return (
    <div className="flex flex-col w-full bg-white mt-2 rounded-lg">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between start gap-3">
          <span className="text-xl">{commentElements.length} Comments</span>
          <div className="flex gap-2">
            <label htmlFor="commentSort" className="text-xl">
              Sorting:
            </label>
            <select onChange={handleCommentSort} name="commentSort">
              <option value="Newest first">
                {COMMENT_SORT_OPTIONS.NEWEST_FIRST}
              </option>
              <option value="Most liked">
                {COMMENT_SORT_OPTIONS.MOST_LIKED}
              </option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="self-start w-10 h-10 rounded-full mr-4"
            src={userData?.profileUrl || DEFAULT_PROFILE_IMAGE_URL}
            alt="User Profile"
          />
          <textarea
            ref={commentInput}
            onChange={(e) => handleInputChange(e)}
            maxLength={350}
            className="p-4 resize-none w-full h-48 border border-gray-300 rounded-md"
            placeholder="What do you think?"
            name="comment"
            value={comment}
          />
          <button
            onClick={() => handleSubmitComment()}
            className="transition border hover:text-orange-500 hover:bg-gray-100 rounded-3xl px-5 py-2"
          >
            Submit
          </button>
        </div>
        {comments.length > 0 && commentElements}
      </div>
    </div>
  );
}

export default CommentSection;
