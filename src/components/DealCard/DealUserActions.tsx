import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { checkSavedDeal, toggleSaved } from "../../api/firebase/deals";
import { fetchProfileImageUrl } from "../../api/firebase/storage";
import { auth } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";

interface DealUserActionsProps {
  userId: string;
  owner: string;
  postId: string;
  commentsCount?: number;
  voucherCode?: string;
  dealLink: string;
}

const DealUserActions: React.FC<DealUserActionsProps> = ({
  userId,
  owner,
  postId,
  commentsCount,
  voucherCode,
  dealLink,
}) => {
  const { user } = UserAuth();
  const currentUserId = auth.currentUser?.uid;

  const [hasSaved, setHasSaved] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string>("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      const profileImageUrl = await fetchProfileImageUrl(userId);
      setProfileUrl(profileImageUrl);
    };

    fetchProfileImage();
  }, [userId]);

  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, postId);
    }
  }, [postId, currentUserId]);

  return (
    <div className="flex items-center justify-between gap-5 mt-4">
      <Link
        className="flex justify-center items-center"
        to={`profile/${owner}`}
      >
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={profileUrl}
          alt={`${owner}'s profile`}
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{owner}</p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-3 items-center justify-end text-gray-600">
        <button
          onClick={() => {
            if (!user) return;
            toggleSaved(hasSaved, setHasSaved, user.uid, postId);
          }}
          className="flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-8 h-8"
        >
          {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
        </button>
        <Link
          to={`/deal/${postId}`}
          className="flex border hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-20 h-8"
        >
          <BiCommentDetail /> {commentsCount ?? 0}
        </Link>
        {!voucherCode && (
          <button className="flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-32 h-8">
            <a
              className="flex gap-2 items-center"
              href={dealLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to deal
              <FiExternalLink />
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default DealUserActions;
