import React, { useEffect, useState } from 'react'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { UserAuth } from '../context/AuthContext'


function DealCard({ postId, title, date, time, owner, price, nextBestPrice, description, dealLink }) {

  const { user } = UserAuth()
  const likesRef = collection(db, "likes")
  const likesDoc = query(likesRef, where("postId", "==", postId))

  const dislikesRef = collection(db, "dislikes")
  const dislikesDoc = query(dislikesRef, where("postId", "==", postId))

  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])

  const getLikes = async () => {
    const data = await getDocs(likesDoc)
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
  }

  const getDislikes = async () => {
    const data = await getDocs(dislikesDoc)
    setDislikes(data.docs.map((doc) => ({ userId: doc.data().userId, dislikeId: doc.id })))
  }

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user.uid, postId: postId})
      if (user) {
        setLikes((prev) => 
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addDislike = async () => {
    try {
      const newDoc = await addDoc(dislikesRef, { userId: user.uid, postId: postId})
      if (user) {
        setDislikes((prev) => 
          prev
            ? [...prev, { userId: user.uid, dislikeId: newDoc.id }]
            : [{ userId: user.uid, dislikeId: newDoc.id }]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", postId),
        where("userId", "==", user.uid)
      )

      const likeToDeleteData = await getDocs(likeToDeleteQuery)
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes", likeId)
      await deleteDoc(likeToDelete)
      if (user) {
        setLikes ((prev) =>
          prev.filter((like) => like.likeId !== likeId)
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteDislike = async () => {
    try {
      const dislikeToDeleteQuery = query(
        dislikesRef,
        where("postId", "==", postId),
        where("userId", "==", user.uid)
      )

      const dislikeToDeleteData = await getDocs(dislikeToDeleteQuery)
      const dislikeId = dislikeToDeleteData.docs[0].id
      const dislikeToDelete = doc(db, "dislikes", dislikeId)
      await deleteDoc(dislikeToDelete)
      if (user) {
        setDislikes ((prev) =>
          prev.filter((like) => like.dislikeId !== dislikeId)
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const userLiked = likes.find((like) => like.userId === user.uid)

  const userDisliked = dislikes.find((dislike) => dislike.userId === user.uid)

  useEffect(() => {
    getLikes()
    getDislikes()
  }, [])
  
  return (
<div className="max-w-sm w-full lg:max-w-4xl lg:flex justify-center">
  <div className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-slate-500">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
      <div className="text-sm text-gray-600 flex items-center justify-between">
        <div className='flex justify-around items-center gap-2 rounded-l-full rounded-r-full border border-black w-32 h-8 p-2 mb-2'>
          <button onClick={userDisliked ? deleteDislike : addDislike} className='text-blue-500 font-bold text-2xl'>–</button>
          <span className='font-bold text-lg'> {likes.length - dislikes.length || 0} </span>
          <button onClick={userLiked ? deleteLike : addLike} className='text-orange-500 font-bold text-2xl'>+</button>          
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