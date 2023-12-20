import React from "react";
import { Link } from "react-router-dom";

interface SearchResultItemProps {
  result: {
    id: string;
    data: {
      imageURL: string;
      likesCount: number;
      dislikesCount: number;
      title: string;
      price: number;
    };
  };
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <div className="w-full p-3 hover:bg-slate-200">
      <Link
        to={`/deal/${result.id}`}
        className="flex flex-row justify-start w-full"
      >
        <div className="h-12 w-12 mr-3 border bg-white border-slate-500 p-1 rounded-lg flex items-center justify-center gap-3">
          {result.data.imageURL && (
            <img
              className="w-full h-full bg-white bg-center object-contain"
              src={result.data.imageURL}
              alt="Deal Image"
            />
          )}
        </div>
        <div className="flex w-full gap-2 items-center justify-between">
          <p className="font-bold text-slate-800 text-ellipsis">
            <span className="text-center text-orange-500 font-bold p-1">
              {result.data.likesCount - result.data.dislikesCount}
            </span>
            {result.data.title}
          </p>
          <p className="font-bold text-sm text-orange-500">
            {result.data.price}zł
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SearchResultItem;
