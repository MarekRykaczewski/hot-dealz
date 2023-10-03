import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchSearchResults } from '../../api'

function NavSearchBar() {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
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
      console.error('Error searching for deals:', error);
    }
  };  

  useEffect(() => {
    if (isFocused) {
      handleSearch()
    }
  }, [searchQuery, isFocused])

  return (
    <div className='relative h-8 flex min-w-[300px]'>
      <input
        className='w-full rounded-full px-6 focus:outline-orange-500 focus:outline-4 focus:outline'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleSearchBlur()}
        placeholder="Search deals..."
      />

      <div className='flex flex-col items-center bg-white rounded-lg overflow-hidden absolute top-10 w-full z-50 shadow'>
        {isFocused && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div className='w-full p-3 hover:bg-slate-200' key={result.id}>
              <Link className='flex flex-row justify-start w-full' to={`/deal/${result.id}`}>
                <div className='h-12 w-12 mr-3 border bg-white border-slate-500 p-1 rounded-lg flex items-center justify-center gap-3'>
                {result.data.imageURL && (
                  <img
                    className='w-full h-full bg-white bg-center object-contain'
                    src={result.data.imageURL}
                    alt='Deal Image'
                  />
                )}
                </div>
                <div className='flex w-full gap-2 items-center justify-between'>
                  <p className='font-bold text-slate-800 text-ellipsis'> <span className='text-center text-orange-500 font-bold p-1'> {result.data.likesCount - result.data.dislikesCount} </span> {result.data.title}</p>
                  <p className='font-bold text-sm text-orange-500'>{result.data.price}zł</p> 
                </div> 
              </Link>
            </div>
          ))
        ) : null}
        {isFocused && searchResults.length > 0 && 
        <div className='w-full flex justify-center mt-3 mb-3'>
          <div className='w-2/3 h-8 rounded-full text-md font-bold text-white flex items-center justify-center p-3 bg-orange-500 overflow-hidden'>
            <button onClick={handleSeeAllResults}> See all results </button>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default NavSearchBar