import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const DealAboutSection = ({
  commentInput,
  deal,
  user,
  hasSaved,
  setHasSaved,
  dealId,
  toggleSaved,
}) => {
  return (
    <div className="flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg">
      <div className="p-5">
        <h1 className="font-bold">About this deal</h1>
        <p className="text-gray-700 text-base">{deal?.description}</p>
      </div>
      <div className="bg-orange-500 flex gap-4 w-full rounded-b-lg px-6 py-3 overflow-hidden">
        <button
          onClick={() => commentInput.current?.focus()}
          className="flex flex-row-reverse gap-2 items-center justify-center hover:text-white transition"
        >
          New comment <BiCommentDetail />
        </button>
        <button
          onClick={() => {
            if (!user) return;
            toggleSaved(hasSaved, setHasSaved, user.uid, dealId!);
          }}
          className="flex flex-row-reverse gap-2 items-center justify-center hover:text-white transition"
        >
          Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
    </div>
  );
};

export default DealAboutSection;
