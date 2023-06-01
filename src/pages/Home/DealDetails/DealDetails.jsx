import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import DealCardVotes from '../DealCardVotes'
import ImageSlider from '../ImageSlider'
import CommentSection from './CommentSection'
import Comment from './Comment'
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toggleSaved, checkSavedDeal } from '../../../utils'
import { auth, storage } from '../../../config/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

function DealDetails() {

  const userId = auth.currentUser?.uid
  const [hasSaved, setHasSaved] = useState(false)
  const [deal, setDeal] = useState([])
  const { imageCount, title, date, time, owner, price, nextBestPrice, description, dealLink } = deal
  const { dealId } = useParams();
  const [slides, setSlides] = useState([])
  const [comments, setComments] = useState([])

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
    let list = []
    try {
        const querySnapshot = await getDocs(collection(db, "deals", dealId, "comments"))
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() })
        });
        setComments(list)
    } catch (err) {
        console.log(err)
    }
}

  const getImages = async () => {
    const imageList = []
      for (let i = 0; i < imageCount; i++) {
        const imageRef = ref(storage, `images/${dealId}/${i}`)
        const url = await getDownloadURL(imageRef)
        imageList.push({url: url})
      }  
      setSlides(imageList)
    }

  const commentElements = 
    comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            userId={comment.userId}
            postId={dealId}
            comment={comment.comment}
            date={comment.posted.toDate().toDateString()}
            time={comment.posted.toDate().toLocaleTimeString()}
          />
        )
    })
      
  useEffect(() => {
    fetchData(dealId)
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
    <div className='bg-slate-200 w-full h-screen flex flex-col ml-auto mr-auto items-center justify-start'>
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
              <div className='flex gap-3 items-center'>
                <p className='text-orange-500 font-bold text-3xl'> {price}</p>
                <del className=' text-gray-500 font-bold text-xl'> {nextBestPrice} </del>
                <p className='text-xl'> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p> 
              </div>
              <button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-32 h-8'>
                <a className='flex gap-2 items-center' href={dealLink} target='_blank'>Go to deal<FiExternalLink /> </a> 
              </button>
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
            <button onClick={() => toggleSaved(hasSaved, setHasSaved, userId, dealId)} className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}</button>
          </div>
      </div>
      <CommentSection postId={dealId} commentElements={commentElements}  />
    </div>
  )
}

export default DealDetails