import React, { useEffect, useState } from 'react'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DealCardVotes from './DealCardVotes'
import ImageSlider from './ImageSlider'
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../config/firebase'


function DealCard({ postId, imageCount, title, date, time, owner, price, nextBestPrice, description, dealLink }) {  
  
  const [slides, setSlides] = useState([""])

  useEffect(() => {
      const getImages = async () => {

      const imageList = []

        for (let i = 0; i < imageCount; i++) {
          const imageRef = ref(storage, `images/${postId}/${i}`)
          const url = await getDownloadURL(imageRef)
          imageList.push({url: url})
        }  
        setSlides(imageList)
      }
      getImages()
      console.log(slides)
    }, [])
  
  return (
<div className="px-5 w-full sm:max-w-4xl sm:flex justify-center">
  <div className="h-48 sm:h-auto sm:w-64 flex-none bg-cover text-center overflow-hidden bg-slate-500">
  <ImageSlider slides={slides} />
  </div>
  <div className="bg-white p-4 flex flex-col justify-between leading-normal w-full">
    <div className="mb-8">
      <div className="text-sm text-gray-600 flex items-center justify-between">
        <DealCardVotes postId={postId} />
        <div className='flex gap-2 items-center mb-2'>
          <AiOutlineClockCircle size={"1.4em"} />
          <div className='flex flex-col items-center'>
          <span className='text-xs'> {date} </span>
          <span className='text-xs'> {time} </span>
          </div>
        </div>
      </div>
      <Link className='block' to={`/deal/${postId}`} state={ {postId: postId, title: title, date :date, time: time, owner: owner, price: price, nextBestPrice: nextBestPrice, description: description, dealLink: dealLink} }>
      <div className="text-gray-900 font-bold text-xl mb-2 hover:text-orange-500 transition">{title}</div>
      </Link>
      <div className='flex gap-3'>
        <p className='text-orange-500 font-bold'> {price}</p>
        <del className=' text-gray-500 font-bold'> {nextBestPrice} </del>
        <p> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p> 
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
      <div className='flex flex-wrap gap-3 items-center justify-end text-gray-600'>
        <button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-8 h-8'><BsBookmark /></button>
        <button className='flex border hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-20 h-8'><BiCommentDetail /> 175</button>
        <button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-32 h-8'>
         <a className='flex gap-2 items-center' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default DealCard