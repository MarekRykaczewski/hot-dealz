import React, { useEffect, useState, useRef } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';

function CategoryCarousel() {

    const [categories, setCategories] = useState([])
    
    const ref = useRef(null)

    const scroll = (scrollOffset) => { ref.current.scrollLeft += scrollOffset }
    
    const fetchData = async () => {
        let list = [];
        try {
          const querySnapshot = await getDocs(collection(db, "itemCategories"));
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          setCategories(list);
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const items = categories.map(item => (
        <Link className='w-fit' key={item.title} to={`/?category=${encodeURIComponent(item.title)}`}>
          <button className='flex text-md leading-6 gap-1 h-10 min-w-fit w-[150px] px-2 items-center justify-center bg-slate-600 rounded-lg text-white font-semibold hover:bg-slate-500 transition'> 
            {item.title}
          </button>
        </Link>
      ));
      
  return (
    <div className='bg-slate-900 py-3 w-full'>
        <div className='flex items-center justify-center'>
            <button onClick={() => scroll(-150)} id='slideLeft' className='flex item-center justify-center p-2'>
                <AiFillCaretLeft fontSize='1.5em' className=' text-slate-500'/>
            </button>
            <div ref={ref} id='carouselContainer' className='flex flex-row w-fit overflow-x-hidden scroll-smooth gap-4 p-1'>
            {items}
            </div>
            <button onClick={() => scroll(150)} id='slideRight' className='flex item-center justify-center p-2'>
                <AiFillCaretRight fontSize='1.5em' className='text-slate-500'/>
            </button>
        </div>
    </div>
  )
}

export default CategoryCarousel