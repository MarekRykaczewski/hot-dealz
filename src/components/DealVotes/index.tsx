import { useEffect, useState } from "react";
import { BsHourglassBottom } from "react-icons/bs";
import { getTotalScore, handleVote } from "../../api/firebase/deals";
import { checkVote } from "../../api/firebase/deals/checkVote";
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

interface DealVotesProps {
  postId: string;
  archived: boolean;
}

function DealVotes({ postId, archived }: DealVotesProps) {
  const { user } = UserAuth();
  const [totalScore, setTotalScore] = useState<number>(0);
  const [userVote, setUserVote] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const score = await getTotalScore(postId);
        setTotalScore(score || 0);

        if (user) {
          const vote = await checkVote(postId, user.uid);
          setUserVote(vote);
        }
      } catch (error) {
        console.error("Error fetching total score:", error);
        setTotalScore(0);
      }
    }

    fetchData();
  }, [postId, user]);

  const handleVoteClick = async (voteType: "like" | "dislike") => {
    if (!user || userVote === voteType) return;

    // Optimistic rendering
    setUserVote(voteType);

    // Update totalScore optimistically
    setTotalScore((prevTotalScore) =>
      voteType === "like" ? prevTotalScore + 1 : prevTotalScore - 1
    );

    // Perform the Firebase operation in the background
    const success = await handleVote(postId, voteType, user);

    if (!success) {
      // Handle error and potentially revert the UI update
      setUserVote(null);
    }
  };

  if (archived) {
    return (
      <div className="relative flex justify-center items-center gap-5 rounded-l-full rounded-r-full border w-36 h-8 py-4">
        <span className="font-bold text-lg">{totalScore}</span>
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
        disabled={userVote === "dislike"}
        text="blue"
      />
      <span className="font-bold text-lg">{totalScore}</span>
      <VoteButton
        onClick={() => handleVoteClick("like")}
        disabled={userVote === "like"}
        text="orange"
      />
    </div>
  );
}

export default DealVotes;
