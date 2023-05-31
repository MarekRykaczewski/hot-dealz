import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { BiCommentDetail, BiCopyAlt } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DealCardVotes from './DealCardVotes'
import ImageSlider from './ImageSlider'
import { ref, getDownloadURL } from "firebase/storage"
import { auth, storage } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'
import { toggleSaved, checkSavedDeal } from '../../utils'

function DealCard({ userId, postId, imageCount, title, date, time, owner, price, nextBestPrice, description, dealLink, voucherCode, comments }) {  
  
  const [hasSaved, setHasSaved] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [slides, setSlides] = useState([""])
  const { user } = UserAuth()
  const currentUserId = auth.currentUser?.uid

  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, postId);
    }
  }, []);

  useEffect(() => {
    fetchProfileImage();
  }, [userId]);

  const fetchProfileImage = async () => {
    try {
      const imageRef = ref(storage, `profileImages/${userId}/image`);
      const imageUrl = await getDownloadURL(imageRef);
      setProfileUrl(imageUrl);
    } catch (error) {
      console.log('Error fetching profile image:', error);
    }
  };

  const getImages = async () => {

    const imageList = []

      for (let i = 0; i < imageCount; i++) {
        const imageRef = ref(storage, `images/${postId}/${i}`)
        const url = await getDownloadURL(imageRef)
        imageList.push({url: url})
      }  
      setSlides(imageList)
    }

  useEffect(() => {
      getImages()
    }, [])

    const copyToClipboard = (e) => {
      navigator.clipboard.writeText(e.target.value)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  
  return (
<div className="px-5 w-full max-h-96 sm:max-w-4xl sm:flex justify-center mb-32 lg:mb-0">
  <div className="h-48 sm:h-auto sm:w-64 flex-none bg-cover text-center overflow-hidden bg-slate-500">
  {imageCount > 0 && <ImageSlider slides={slides} />}
  </div>
  <div className="bg-white p-4 h-80 flex flex-col gap-4 justify-between leading-normal w-full">
    <div className='flex flex-col gap-1'>
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
      <Link className='block' to={`/deal/${postId}`} state={ {postId: postId, title: title, date :date, time: time, owner: owner, price: price, nextBestPrice: nextBestPrice, description: description, dealLink: dealLink, imageCount: imageCount, slides: slides} }>
      <div className="text-gray-900 font-bold text-xl hover:text-orange-500 transition">{title}</div>
      </Link>
      <div className='flex gap-3'>
        <p className='text-orange-500 font-bold'> {price}</p>
        <del className=' text-gray-500 font-bold'> {nextBestPrice} </del>
        <p> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p> 
      </div>
      {voucherCode && 
      <div className='mb-2 mt-2 flex gap-3 w-full text-gray-60'>
        <button value={voucherCode} onClick={(e) => copyToClipboard(e)} className='flex border-dashed border-2 border-gray-300 hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-full h-8'> {isCopied ? 'Copied!' : voucherCode} <BiCopyAlt size={20}/> </button>
        <button className='flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-full h-8'>
         <a className='flex gap-2 items-center ' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
        </button>
      </div>}
      <p className={`text-gray-700 ${voucherCode ? 'line-clamp-3' : 'line-clamp-5'} w-full overflow-hidden text-ellipsis`}>{description}</p>
    </div>
    <div className="flex items-center justify-between gap-5">
      <div className='flex justify-center items-center'>
        <img className="w-10 h-10 rounded-full mr-4" src={profileUrl} />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{owner}</p>
        </div>      
      </div>
      <div className='flex flex-wrap gap-3 items-center justify-end text-gray-600'>
        <button onClick={() => toggleSaved(hasSaved, setHasSaved, user.uid, postId)} className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-8 h-8'>{hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}</button>
        <button className='flex border hover:bg-gray-100 transition items-center gap-2 justify-center rounded-full w-20 h-8'><BiCommentDetail /> {comments} </button>
        {!voucherCode && <button className='flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-32 h-8'>
         <a className='flex gap-2 items-center' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
        </button>}
      </div>
    </div>
  </div>
</div>
  )
}

export default DealCard