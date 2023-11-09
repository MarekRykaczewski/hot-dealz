import { useEffect, useState } from "react";
import { BsHourglassBottom } from "react-icons/bs";
import { getLikesAndDislikes, handleVote } from "../../api/firebase/firestore";
import { UserAuth } from "../../context/AuthContext";

interface VoteButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
}

function VoteButton({ onClick, disabled, text }: VoteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-${text}-500 font-bold text-2xl hover:bg-${text}-100 rounded-full h-8 w-8 items-center justify-center flex ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text === "blue" ? "–" : "+"}
    </button>
  );
}

interface DealCardVotesProps {
  postId: string;
  archived: boolean;
}

function DealCardVotes({ postId, archived }: DealCardVotesProps) {
  const { user } = UserAuth();
  const [likes, setLikes] = useState<any[]>([]);
  const [dislikes, setDislikes] = useState<any[]>([]);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  async function fetchData() {
    const { likes: likesData, dislikes: dislikesData } =
      await getLikesAndDislikes(postId);
    setLikes(likesData);
    setDislikes(dislikesData);
    setUserLiked(likesData.some((doc) => doc.id === user?.uid));
    setUserDisliked(dislikesData.some((doc) => doc.id === user?.uid));
  }

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts or when postId/user changes
  }, [postId, user]);

  const optimisticRender = (voteType: "like" | "dislike") => {
    if (voteType === "like") {
      if (!userLiked) {
        setLikes([...likes, { id: user?.uid }]);
        setUserLiked(true);

        // Remove the user's dislike if it exists
        if (userDisliked) {
          setDislikes(dislikes.filter((doc) => doc.id !== user?.uid));
          setUserDisliked(false);
        }
      } else {
        setLikes(likes.filter((doc) => doc.id !== user?.uid));
        setUserLiked(false);
      }
    } else if (voteType === "dislike") {
      if (!userDisliked) {
        setDislikes([...dislikes, { id: user?.uid }]);
        setUserDisliked(true);

        // Remove the user's like if it exists
        if (userLiked) {
          setLikes(likes.filter((doc) => doc.id !== user?.uid));
          setUserLiked(false);
        }
      } else {
        setDislikes(dislikes.filter((doc) => doc.id !== user?.uid));
        setUserDisliked(false);
      }
    }
  };

  const handleVoteClick = async (voteType: "like" | "dislike") => {
    if (!user) return;
    // Optimistic rendering
    optimisticRender(voteType);

    // Perform the Firebase operation in the background
    const success = await handleVote(postId, voteType, user);
    if (!success) {
      // Handle error and potentially revert the UI update
    }
  };

  if (archived) {
    return (
      <div className="relative flex justify-center items-center gap-5 rounded-l-full rounded-r-full border w-36 h-8 py-4">
        <span className="font-bold text-lg">
          {" "}
          {likes.length - dislikes.length || 0}{" "}
        </span>
        <div className="flex text-lg items-center gap-1">
          <BsHourglassBottom size={"1.2em"} />
          <span> Ended </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-between items-center gap-2 rounded-l-full rounded-r-full border w-28 h-8 py-4">
      <VoteButton
        onClick={() => handleVoteClick("dislike")}
        disabled={userDisliked}
        text="blue"
      />
      <span className="font-bold text-lg">
        {" "}
        {likes.length - dislikes.length || 0}{" "}
      </span>
      <VoteButton
        onClick={() => handleVoteClick("like")}
        disabled={userLiked}
        text="orange"
      />
    </div>
  );
}

export default DealCardVotes;
