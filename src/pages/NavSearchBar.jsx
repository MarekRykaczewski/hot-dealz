import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'

function NavSearchBar() {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  // I wanted to do this in firebase however its not supported, solutions like Elastic search are paid
  const handleSearch = async () => {
    const dealsRef = collection(db, 'deals');
    const lowercaseQuery = searchQuery.toLowerCase();
    const q = query(dealsRef);
  
    try {
      const querySnapshot = await getDocs(q);
      let results = [];
  
      if (lowercaseQuery.trim() !== '') {
        results = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter((result) =>
            result.data.title.toLowerCase().includes(lowercaseQuery)
          )
          .sort((a, b) => a.data.title.localeCompare(b.data.title))
          .slice(0, 5); // Extract only the first 5 results
      }
  
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
    <div className='relative flex w-[250px]'>
      <input
        className='border w-full rounded-md p-1 pl-3 focus:outline-orange-500'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleSearchBlur()}
        placeholder="Search deals..."
      />

      <div className='bg-white rounded-lg absolute top-10 w-full'>
        {isFocused && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div className='p-3' key={result.id}>
              <Link className='flex flex-row justify-between' to={`/deal/${result.id}`}>
                <p>{result.data.title}</p>
                  <div className='flex gap-1'>
                    <p className='font-bold text-orange-500'>{result.data.price}</p> 
                    <p className='text-sm text-gray-500 line-through'>{result.data.nextBestPrice}</p> 
                  </div> 
                 
              </Link>
            </div>
          ))
        ) : null}
      </div> 
    </div>
  );
}

export default NavSearchBar