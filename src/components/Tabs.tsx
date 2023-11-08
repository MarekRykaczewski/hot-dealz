import React from "react";

interface TabsProps {
  currentSorting?: "newest" | "comments";
  setCurrentSorting: (sorting: "newest" | "comments") => void;
}

const Tabs: React.FC<TabsProps> = ({ currentSorting, setCurrentSorting }) => {
  const handleSortByNewest = () => {
    setCurrentSorting("newest");
  };

  const handleSortByComments = () => {
    setCurrentSorting("comments");
  };

  return (
    <div className="bg-white w-full px-5 py-2 border-b-2 border-gray-300">
      <div className="flex justify-start gap-3 max-w-[80em] ml-auto mr-auto">
        <button
          className={`text-lg text-slate-800 font-bold p-2 hover:text-orange-600 transition ${
            currentSorting === "newest" && "text-orange-600"
          }`}
          onClick={handleSortByNewest}
        >
          Newest
        </button>
        <button
          className={`text-lg text-slate-800 font-bold p-2 hover:text-orange-600 transition ${
            currentSorting === "comments" && "text-orange-600"
          }`}
          onClick={handleSortByComments}
        >
          Most Comments
        </button>
      </div>
    </div>
  );
};

export default Tabs;
