import React from "react";

interface TabsProps {
  currentSorting?: "newest" | "comments";
  setCurrentSorting: (sorting: "newest" | "comments") => void;
}

const Tabs: React.FC<TabsProps> = ({ currentSorting, setCurrentSorting }) => {
  const tabOptions: ("newest" | "comments")[] = ["newest", "comments"];

  return (
    <div className="bg-white w-full px-5 py-2 border-b-2 border-gray-300">
      <div className="flex justify-start gap-3 max-w-[80em] ml-auto mr-auto">
        {tabOptions.map((option) => (
          <button
            key={option}
            className={`text-lg text-slate-800 font-bold p-2 hover:text-orange-600 transition ${
              currentSorting === option && "text-orange-600"
            }`}
            onClick={() => setCurrentSorting(option)}
            aria-selected={currentSorting === option}
            role="tab"
            tabIndex={currentSorting === option ? 0 : -1}
          >
            {option === "newest" ? "Newest" : "Most Comments"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
