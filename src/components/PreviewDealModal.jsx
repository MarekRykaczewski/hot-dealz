import React from 'react'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'

function PreviewDealModal({ toggleOpenDealPreview, title, date, time, owner, price, lastBestPrice, upvotes, description }) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-10 '>
        <div className='relative flex flex-col gap-3 bg-white border p-10'>
            <button onClick={toggleOpenDealPreview} className='absolute top-[-10px] right-[-10px] flex items-center justify-center border text-center rounded-full text-white transition hover:bg-orange-400 bg-orange-500 w-6 h-6'>  
                &times;
            </button> 
            <div className="max-w-sm w-full lg:max-w-4xl lg:flex justify-center">
            <div className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-slate-500">
            </div> 
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                <div className="text-sm text-gray-600 flex items-center justify-between">
                    <div className='flex justify-around items-center gap-2 rounded-l-full rounded-r-full border border-black w-32 h-8 p-2 mb-2'>
                    <button className='text-blue-500 font-bold text-2xl'>–</button>
                    <span className='font-bold text-lg'> {upvotes} </span>
                    <button className='text-orange-500 font-bold text-2xl'>+</button>          
                    </div>
                    <div className='flex gap-2 items-center mb-2'>
                    <AiOutlineClockCircle size={"1.4em"} />
                    <div className='flex flex-col items-center'>
                    <span className='text-xs'> {date} </span>
                    <span className='text-xs'> {time} </span>
                    </div>
                    </div>
                </div>
                <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                <div className='flex gap-3'>
                    <p className='text-orange-500 font-bold'> {price}</p>
                    <del className=' text-gray-500 font-bold'> {lastBestPrice} </del>
                    <p> -{Math.floor((lastBestPrice - price) / price * 100)}% </p> 
                </div>
                <p className="text-gray-700 text-base">{description}</p>
                </div>
                <div className="flex items-center justify-between gap-5">
                <div className='flex justify-center items-center'>
                    <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                    <div className="text-sm">
                    <p className="text-gray-900 leading-none">{owner}</p>
                    </div>      
                </div>
                <div className='flex gap-5'>
                    <button><BsBookmark /></button>
                    <button className='flex items-center justify-center gap-1'><BiCommentDetail /> 175</button>
                    <button className='flex items-center justify-center gap-1'>Go to deal<FiExternalLink /></button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewDealModal