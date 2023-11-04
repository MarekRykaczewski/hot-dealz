import React, { ChangeEvent, RefObject, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Comment } from "../types";
import { sortCommentsByLikes, sortCommentsByNewest } from "../utils";
import CommentCard from "./CommentCard";
import { submitComment } from "../api/firebase/comments";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  commentInput: RefObject<HTMLTextAreaElement>;
}

function CommentSection({
  postId,
  comments,
  setComments,
  commentInput,
}: CommentSectionProps) {
  const { user, userData } = UserAuth();

  const [comment, setComment] = useState<string>("");

  const formatDate = (date: { seconds: number }) => {
    return new Date(date.seconds * 1000).toLocaleString();
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    if (selectedSort === "Newest first") {
      sortCommentsByNewest(comments, setComments);
    } else if (selectedSort === "Most liked") {
      sortCommentsByLikes(comments, setComments);
    }
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
    if (comment.trim() === "") {
      return;
    }

    const newComment = {
      userId: user?.uid,
      comment: comment,
    };

    const updatedComments = await submitComment(postId, newComment);

    setComments(updatedComments);
    setComment("");
  };

  return (
    <div className="flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex start gap-3">
          <span className="text-xl">{commentElements.length} Comments</span>
          <label htmlFor="commentSort" className="text-xl">
            Sorting:{" "}
          </label>
          <select onChange={handleCommentSort} name="commentSort">
            <option value="Newest first">Newest first</option>
            <option value="Most liked">Most liked</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="self-start w-10 h-10 rounded-full mr-4"
            src={userData.profileUrl}
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
        {commentElements}
      </div>
    </div>
  );
}

export default CommentSection;
