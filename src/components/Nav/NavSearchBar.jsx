import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { db } from '../../config/firebase'

function NavSearchBar() {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  // I wanted to do this in firebase however its not supported, 
  // solutions like Elastic search are premium only,
  // a workaround with each possible search option for each title is not performant
  const handleSearch = async () => {
    const dealsRef = collection(db, 'deals');
    const lowercaseQuery = searchQuery.toLowerCase();
    const q = query(dealsRef);
  
    try {
      const querySnapshot = await getDocs(q);
      let results = [];
  
      if (lowercaseQuery.trim() !== '') {
        results = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const dealData = doc.data();
            const likesSnapshot = await getDocs(collection(dealsRef, doc.id, 'likes'));
            const dislikesSnapshot = await getDocs(collection(dealsRef, doc.id, 'dislikes'));
            const likesCount = likesSnapshot.size;
            const dislikesCount = dislikesSnapshot.size;
  
            return {
              id: doc.id,
              data: {
                ...dealData,
                likesCount,
                dislikesCount,
              },
            };
          })
        );
  
        results = results
          .filter((result) => result.data.title.toLowerCase().includes(lowercaseQuery))
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

  console.log(searchResults)

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

      <div className='bg-white rounded-lg overflow-hidden absolute top-10 w-full z-50'>
        {isFocused && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div className='p-3 hover:bg-slate-200' key={result.id}>
              <Link className='flex flex-row justify-start' to={`/deal/${result.id}`}>
                <div className='flex gap-3'>
                  {result.data.imageURLs && result.data.imageURLs[0] && (
                    <img
                      className='h-12 w-12 bg-white bg-center mr-3 border rounded-lg border-slate-500 object-contain'
                      src={result.data.imageURLs[0]}
                      alt='Deal Image'
                    />
                  )}
                </div>
                <div className='flex gap-2 items-center'>
                  <p className='text-orange-500 font-bold'>{result.data.likesCount - result.data.dislikesCount}</p>
                  <p className='font-bold text-slate-800'>{result.data.title}</p>
                  <p className='font-bold text-orange-500'>{result.data.price}zł</p> 
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