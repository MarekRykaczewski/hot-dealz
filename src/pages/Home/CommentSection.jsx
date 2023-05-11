import React, { useState } from 'react'
import { setDoc, serverTimestamp, addDoc, collection, deleteDoc, doc, getDocs, query, where, Timestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'

function CommentSection({ postId, commentElements }) {

  const { user } = UserAuth()

  const [comment, setComment] = useState()

  const handleInputChange = (e) => {
    setComment(e.target.value)
  }

  console.log(comment)

  const submitComment = async () => {
    const postCommentsCollectionRef = collection(db, "deals", postId, "comments");
    const newCommentDocRef = doc(postCommentsCollectionRef);
  
    await setDoc(newCommentDocRef, {
      userId: user.uid,
      comment: comment,
      posted: serverTimestamp()
    });
  }
  
  return (
    <div className='flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg overflow-hidden'>
        <div className='flex flex-col gap-4 p-6'>
            <div className='flex start gap-3'>
                <span className='text-xl'>3 Comments</span>
                <span className='text-xl'>Sorting: Newest first</span>
            </div>
            <div className='flex items-center gap-3'>
                <img className="self-start w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                <textarea onChange={(e) => handleInputChange(e)} maxLength='350' className='p-4 resize-none w-full h-48 border border-gray-300 rounded-md' type="textarea" placeholder='What do you think?' name="comment" />
                <button onClick={() => submitComment()} className='transition border hover:text-orange-500 hover:bg-gray-100 rounded-3xl px-5 py-2'> Submit </button>
            </div>
          {commentElements}
        </div>
    </div>
  )
}

export default CommentSection