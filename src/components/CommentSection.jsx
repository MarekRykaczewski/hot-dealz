import React, { useState } from 'react'
import { setDoc, serverTimestamp, collection, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { UserAuth } from '../context/AuthContext'
import Comment from './Comment'
import { sortCommentsByLikes, sortCommentsByNewest } from '../utils'

function CommentSection({ postId, comments, setComments, commentInput }) {

  const { user, userData } = UserAuth()

  const [comment, setComment] = useState()

  const handleInputChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = async () => {
    const postCommentsCollectionRef = collection(db, "deals", postId, "comments");
    const newCommentDocRef = doc(postCommentsCollectionRef);
  
    await setDoc(newCommentDocRef, {
      userId: user.uid,
      comment: comment,
      posted: serverTimestamp()
    });

    location.reload()

  }

  const commentElements = 
  comments.map(comment => {
      return (
        <Comment
          key={comment.id}
          commentId={comment.id}
          userId={comment.userId}
          postId={postId}
          comment={comment.comment}
          date={comment.posted.toDate().toDateString()}
          time={comment.posted.toDate().toLocaleTimeString()}
        />
      )
  })

  const handleCommentSort = (event) => {
    const selectedSort = event.target.value;

    if (selectedSort === "Newest first") {
      sortCommentsByNewest(comments, setComments);
    } else if (selectedSort === "Most liked") {
      console.log("by likes")
      sortCommentsByLikes(comments, setComments)
    }
  }
  
  return (
    <div className='flex flex-col w-full h-full max-w-3xl bg-white mt-2 rounded-lg'>
        <div className='flex flex-col gap-4 p-6'>
            <div className='flex start gap-3'>
                <span className='text-xl'>{commentElements.length} Comments</span>
                <label htmlFor='commentSort' className='text-xl'>Sorting: </label>
                <select onChange={handleCommentSort} name="commentSort" >
                  <option value="Newest first">Newest first </option>
                  <option value="Most liked">Most liked </option>
                </select>
            </div>
            <div className='flex items-center gap-3'>
                <img className="self-start w-10 h-10 rounded-full mr-4" src={userData.profileUrl} />
                <textarea ref={commentInput} onChange={(e) => handleInputChange(e)} maxLength='350' className='p-4 resize-none w-full h-48 border border-gray-300 rounded-md' type="textarea" placeholder='What do you think?' name="comment" />
                <button onClick={() => submitComment()} className='transition border hover:text-orange-500 hover:bg-gray-100 rounded-3xl px-5 py-2'> Submit </button>
            </div>
          {commentElements}
        </div>
    </div>
  )
}

export default CommentSection