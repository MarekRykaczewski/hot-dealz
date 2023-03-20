import React from 'react'
import { useRef } from 'react'

import { BsPlugin } from 'react-icons/bs'
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

function CategoryCarousel() {

    const ref = useRef(null)

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset
    }
    

  return (
    <div className=' flex items-center justify-center bg-slate-800 mb-3'>
        <button onClick={() => scroll(-150)} id='slideLeft' className='flex item-center justify-center p-2'>
            <AiFillCaretLeft fontSize='1.5em' className=' text-slate-500'/>
        </button>
        <div ref={ref} id='carouselContainer' className=' flex flex-row w-2/4 overflow-x-hidden scroll-smooth gap-4 p-3'>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
            <div className=' flex gap-1 items-center justify-center bg-slate-500 rounded-lg p-2 text-white font-bold '>
                <BsPlugin />
                <a href="">Electronics</a>
            </div>
        </div>
        <button onClick={() => scroll(150)} id='slideRight' className='flex item-center justify-center p-2'>
            <AiFillCaretRight fontSize='1.5em' className='text-slate-500'/>
        </button>
    </div>
  )
}

export default CategoryCarousel