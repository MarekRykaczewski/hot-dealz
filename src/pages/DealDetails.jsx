import React from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import DealCardVotes from '../components/DealCardVotes'
import ImageSlider from '../components/ImageSlider'

function DealDetails() {

    const location = useLocation()
    const { postId, imageCount, title, date, time, owner, price, nextBestPrice, description, dealLink, slides } = location.state

    console.log(imageCount)

  return (
    <div className='bg-slate-200 w-full h-screen flex flex-col ml-auto mr-auto items-center justify-start'>
      <div className='bg-white flex justify-center items-center rounded-lg w-full max-w-3xl mt-3'>
          <div className='h-64 w-full bg-slate-500'>
            {imageCount > 0 && <ImageSlider slides={slides} />}
          </div>
          <div className="bg-white p-4 flex flex-col w-full max-w-3xl justify-between leading rounded-lg">
              <div className="text-sm text-gray-600 flex flex-col  justify-between">
                <DealCardVotes postId={postId} />
                <div className='flex gap-2 items-center mb-2'>
                  {/* <AiOutlineClockCircle size={"1.4em"} /> */}
                  <div className='flex flex-col items-center'>
                  <span className='text-xs'> {date} </span>
                  <span className='text-xs'> {time} </span>
                  </div>
                </div>
              <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
              <div className='flex gap-3 items-center'>
                <p className='text-orange-500 font-bold text-3xl'> {price}</p>
                <del className=' text-gray-500 font-bold text-xl'> {nextBestPrice} </del>
                <p className='text-xl'> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p> 
              </div>
              <button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-32 h-8'>
                <a className='flex gap-2 items-center' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
              </button>
              {/* <p className="text-gray-700 text-base">{description}</p> */}
              <div className="flex items-center justify-between gap-5">
                <div className='flex justify-center items-center'>
                  <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">Shared by {owner}</p>
                  </div>      
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg overflow-hidden'>
          <div className='p-5'>
            <h1 className='font-bold'>About this deal</h1>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
          <div className='bg-slate-300 flex gap-4 w-full px-6 py-3'>
            <button className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>New comment <BiCommentDetail /></button>
            <button className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>Save for later <BsBookmark /></button>
          </div>
      </div>
      <div className='flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg overflow-hidden'>
        Comments
      </div>
    </div>
  )
}

export default DealDetails