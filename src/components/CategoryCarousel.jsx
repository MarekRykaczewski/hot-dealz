import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function CategoryCarousel() {

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
                <button key={item.title} className='flex flex-none gap-1 h-10 w-[150px] items-center justify-center bg-slate-600 rounded-lg p-2 text-white font-bold hover:bg-slate-500 transition'> 
                {item.title}
                </button>
            )
        })
    

  return (
    <div className=' flex items-center justify-center bg-slate-900'>
        <button onClick={() => scroll(-150)} id='slideLeft' className='flex item-center justify-center p-2'>
            <AiFillCaretLeft fontSize='1.5em' className=' text-slate-500'/>
        </button>
        <div ref={ref} id='carouselContainer' className='flex flex-row w-2/4 overflow-x-hidden scroll-smooth gap-4 p-3'>
        {items}
        </div>
        <button onClick={() => scroll(150)} id='slideRight' className='flex item-center justify-center p-2'>
            <AiFillCaretRight fontSize='1.5em' className='text-slate-500'/>
        </button>
    </div>
  )
}

export default CategoryCarousel