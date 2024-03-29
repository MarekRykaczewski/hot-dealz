import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../../api/firebase/deals/fetchSearchResults";
import SearchResultItem from "./SearchResultItem";

interface SearchResult {
  id: string;
  data: {
    imageURL: string;
    likesCount: number;
    dislikesCount: number;
    title: string;
    price: number;
  };
}

interface SearchBarProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({ isFocused, setIsFocused }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const navigate = useNavigate();

  const handleSeeAllResults = () => {
    if (searchQuery) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleSearch = async () => {
    try {
      const results = await fetchSearchResults(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for deals:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleSearch();
    }
  }, [searchQuery, isFocused]);

  return (
    <div className="relative h-8 flex">
      <input
        className="sm:focus:w-fit focus:w-[80vw] w-[50vw] sm:w-fit rounded-full px-9 focus:outline-orange-500 focus:outline-4 focus:outline transition-all duration-100"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleSearchBlur()}
        placeholder="Search deals..."
      />
      <FaSearch className="text-gray-500 absolute left-3 top-2" />
      <div className="flex flex-col items-center bg-white rounded-lg overflow-hidden absolute top-10 w-full z-50 shadow">
        {isFocused &&
          searchResults.length > 0 &&
          searchResults.map((result) => (
            <SearchResultItem key={result.id} result={result} />
          ))}
        {isFocused && searchResults.length > 0 && (
          <div className="w-full flex justify-center mt-3 mb-3">
            <button
              onClick={handleSeeAllResults}
              className="w-2/3 h-8 rounded-full text-md font-bold text-white flex items-center justify-center p-3 bg-orange-500 overflow-hidden"
            >
              <span>See all results</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
