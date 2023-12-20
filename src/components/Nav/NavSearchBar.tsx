import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../api/firebase/firestore/fetchSearchResults";
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

function NavSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="relative h-8 flex min-w-[300px]">
      <input
        className="w-full rounded-full px-6 focus:outline-orange-500 focus:outline-4 focus:outline transition-all duration-100"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleSearchBlur()}
        placeholder="Search deals..."
      />

      <div className="flex flex-col items-center bg-white rounded-lg overflow-hidden absolute top-10 w-full z-50 shadow">
        {isFocused &&
          searchResults.length > 0 &&
          searchResults.map((result) => (
            <SearchResultItem key={result.id} result={result} />
          ))}
        {isFocused && searchResults.length > 0 && (
          <div className="w-full flex justify-center mt-3 mb-3">
            <div className="w-2/3 h-8 rounded-full text-md font-bold text-white flex items-center justify-center p-3 bg-orange-500 overflow-hidden">
              <button onClick={handleSeeAllResults}>See all results</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavSearchBar;
