import React, { useEffect, useState } from 'react'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DealCardVotes from './DealCardVotes'


function DealCard({ postId, title, date, time, owner, price, nextBestPrice, description, dealLink }) {
  return (
<div className="max-w-sm w-full lg:max-w-4xl lg:flex justify-center">
  <div className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-slate-500">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
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
      <div className='flex gap-5'>
        <button><BsBookmark /></button>
        <button className='flex items-center justify-center gap-1'><BiCommentDetail /> 175</button>
        <button className='flex items-center justify-center gap-1'>
         <a href={dealLink} target='_blank'> Go to deal<FiExternalLink /> </a> 
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default DealCard