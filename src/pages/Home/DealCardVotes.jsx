import React, { useEffect, useState } from 'react'

import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'

function DealCardVotes({ postId }) {

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
        if (userDisliked) {
          deleteDislike()
        }
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
        if (userLiked) {
          deleteLike()
        }
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
  
    const userLiked = likes.find((like) => like.userId === user?.uid)
  
    const userDisliked = dislikes.find((dislike) => dislike.userId === user?.uid)
  
    useEffect(() => {
      getLikes()
      getDislikes()
    }, [])

  return (
    <div className='relative flex justify-between items-center gap-2 rounded-l-full rounded-r-full border w-28 h-8 py-4 mb-2'>
        <button onClick={userDisliked ? deleteDislike : addDislike} className='text-blue-500 font-bold text-2xl hover:bg-blue-100 rounded-full h-8 w-8 items-center justify-center flex'>–</button>
            <span className='font-bold text-lg'> {likes.length - dislikes.length || 0} </span>
        <button onClick={userLiked ? deleteLike : addLike} className='text-orange-500 font-bold text-2xl hover:bg-orange-100 rounded-full h-8 w-8 items-center justify-center flex'>+</button>          
    </div>
  )
}

export default DealCardVotes