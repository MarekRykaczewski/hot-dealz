import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';

function CategoryCarousel({ deals, filterDealsByCategory }) {

    const ref = useRef(null)

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset
    }
    
    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "itemCategories"))
                querySnapshot.forEach((doc) => {
                    list.push(doc.data())
                });
                setCategories(list)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const [categories, setCategories] = useState([])

    const items = 
        categories.map(item => {
            return (
                <Link key={item.title} to={`/?category=${encodeURIComponent(item.title)}`}>
                <button className='flex flex-none text-lg gap-1 h-10 w-fit items-center justify-center bg-slate-600 rounded-lg px-5 text-white font-semibold hover:bg-slate-500 transition'> 
                {item.title}
                </button>
                </Link>
            )
        })
    

  return (
    <div className='bg-slate-900 py-2 w-full'>
        <div className='flex items-center justify-center'>
            <button onClick={() => scroll(-150)} id='slideLeft' className='flex item-center justify-center p-2'>
                <AiFillCaretLeft fontSize='1.5em' className=' text-slate-500'/>
            </button>
            <div ref={ref} id='carouselContainer' className='flex flex-row w-fit overflow-x-hidden scroll-smooth gap-4 p-3'>
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