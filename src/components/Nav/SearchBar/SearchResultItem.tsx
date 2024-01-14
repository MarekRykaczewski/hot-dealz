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
      nextBestPrice?: number;
    };
  };
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  if (!result.data.nextBestPrice) return;
  const percentOff = Math.round(
    ((result.data.nextBestPrice - result.data.price) /
      result.data.nextBestPrice) *
      100
  );

  return (
    <div className="w-full p-3 hover:bg-slate-200">
      <Link
        to={`/deal/${result.id}`}
        className="flex flex-row justify-start w-full"
      >
        <div className="h-16 w-24 mr-3 bg-white p-1 rounded-lg flex items-center justify-center gap-3">
          {result.data.imageURL && (
            <img
              className="w-full h-full bg-white bg-center object-contain"
              src={result.data.imageURL}
              alt="Deal Image"
            />
          )}
        </div>
        <div className="flex flex-col w-full gap-2 justify-between">
          <div className="flex gap-1 font-semibold text-slate-800 text-ellipsis">
            <span className="text-center text-orange-500">
              {result.data.likesCount - result.data.dislikesCount}
            </span>
            <span>{result.data.title}</span>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-sm text-orange-500">
              {result.data.price}zł
            </p>
            <p className="line-through text-sm text-gray-500">
              {result.data.nextBestPrice}zł
            </p>
            <p className="text-sm text-black">-{percentOff}%</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResultItem;
