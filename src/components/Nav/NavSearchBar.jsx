import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { db, storage } from '../../config/firebase'
import { ref, getDownloadURL } from 'firebase/storage'

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
            
            let imageURL;

            if (dealData.imageURLs) {
              const imagePath = Array.isArray(dealData.imageURLs)
                ? dealData.imageURLs[0] // First element of the array
                : dealData.imageURLs;   // String value
            
              const storageRef = ref(storage, imagePath);
              
              try {
                imageURL = await getDownloadURL(storageRef);
              } catch (error) {
                console.error('Error fetching image download URL:', error);
              }
            }
          
            return {
              id: doc.id,
              data: {
                ...dealData,
                likesCount,
                dislikesCount,
                imageURL
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
        <div className='w-full flex justify-center mt-3 mb-3'>
          <div className='w-2/3 h-8 rounded-full text-md font-bold text-white flex items-center justify-center p-3 bg-orange-500 overflow-hidden'>
            <button> See all results </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavSearchBar