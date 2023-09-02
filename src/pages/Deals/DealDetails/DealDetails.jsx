import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import DealCardVotes from '../../../components/DealCard/DealCardVotes'
import ImageSlider from '../../../components/ImageSlider'
import CommentSection from './CommentSection'
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toggleSaved, checkSavedDeal } from '../../../utils'
import { auth, storage } from '../../../config/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { sortCommentsByNewest } from '../../../utils'

function DealDetails() {

  const userId = auth.currentUser?.uid
  const [hasSaved, setHasSaved] = useState(false)
  const [deal, setDeal] = useState([])
  const { imageCount, title, date, time, owner, price, nextBestPrice, description, shippingCost, dealLink } = deal
  const { dealId } = useParams();
  const [slides, setSlides] = useState([])
  const [comments, setComments] = useState([])
  const commentInput = useRef(null)
  const [profileUrl, setProfileUrl] = useState('')

  const focusElement = () => {
    commentInput.current && commentInput.current.focus()
    commentInput.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
  }

  const fetchData = async (dealId) => {
    try {
      const dealRef = doc(db, "deals", dealId);
      const dealSnapshot = await getDoc(dealRef);

      if (dealSnapshot.exists()) {
        const dealData = dealSnapshot.data();
        const commentsSnapshot = await getDocs(collection(dealRef, "comments"));
        const commentsCount = commentsSnapshot.size;
        const specificDeal = { id: dealSnapshot.id, ...dealData, comments: commentsCount };
        setDeal(specificDeal);
      } else {
        setDeal([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "deals", dealId, "comments"));
  
      const comments = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const likesSnapshot = await getDocs(collection(db, "deals", dealId, "comments", doc.id, "likes"));
          const likes = likesSnapshot.docs.map((likeDoc) => likeDoc.data());
          return { id: doc.id, ...commentData, likes };
        })
      );
  
      sortCommentsByNewest(comments, setComments);
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = async () => {
    const imageList = []
      for (let i = 0; i < imageCount; i++) {
        const imageRef = ref(storage, `images/${dealId}/${i}`)
        const url = await getDownloadURL(imageRef)
        imageList.push({url: url})
      }  
      setSlides(imageList)
    }

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
      
  useEffect(() => {
    fetchData(dealId)
    console.log(comments)
  }, [])
    
  useEffect(() => {
    if (deal) {
      getImages()
    }
  }, [deal]);

  useEffect(() => {
    if (userId) {
      checkSavedDeal(setHasSaved, userId, dealId);
    }
  }, []);

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='bg-slate-200 w-full flex flex-col ml-auto mr-auto items-center justify-start'>
      <div className='bg-white flex justify-center items-center rounded-lg w-full max-w-3xl mt-3'>
          <div className='h-64 w-full bg-slate-500'>
            {slides.length > 0 && <ImageSlider slides={slides} />}
          </div>
          <div className="bg-white p-4 flex flex-col w-full max-w-3xl">
              <div className="text-sm text-gray-600 flex flex-col items-start gap-3">
                  
                <div className='flex flex-row-reverse w-full justify-between gap-2 items-center'>
                  <div>
                    <div className='flex flex-col items-center'>
                    <span className='text-xs'> {date} </span>
                    <span className='text-xs'> {time} </span>
                    </div>
                  </div>
                  <DealCardVotes postId={dealId} />
                </div>
              <div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
              <div className='flex gap-3 items-center w-full'>
                <p className='text-orange-500 font-bold text-3xl'> {price}</p>
                <del className=' text-gray-500 font-bold text-xl'> {nextBestPrice} </del>
                <p className='text-xl'> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p> 
                <p className='flex flex-row text-lg text-slate-700 gap-2 items-center ml-auto'> <MdOutlineLocalShipping size={20} /> {shippingCost} </p>
              </div>
              <button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-32 h-8'>
                <a className='flex gap-2 items-center' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
              </button>
              <div className="flex items-center justify-between gap-5">
                <div className='flex justify-center items-center'>
                  <img className="w-10 h-10 rounded-full mr-4" src={profileUrl} />
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
            <button onClick={() => focusElement()} className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>New comment <BiCommentDetail /></button>
            <button onClick={() => toggleSaved(hasSaved, setHasSaved, userId, dealId)} className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}</button>
          </div>
      </div>
      <CommentSection commentInput={commentInput} postId={dealId} comments={comments} setComments={setComments} />
    </div>
  )
}

export default DealDetails