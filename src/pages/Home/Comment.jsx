import React, { useEffect, useState } from 'react'
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { FiThumbsUp } from 'react-icons/fi'

function Comment({ postId, commentId, comment, date, time }) {

    const [username, setUsername] = useState()

    useEffect(() => {
        async function getUsername() {
            const username = await getUsernameFromComment(commentId, postId)
            setUsername(username)
        }
        getUsername()
    }, [])

    async function getUsernameFromComment(commentId, dealId) {
        const commentRef = doc(collection(doc(db, `deals/${dealId}`), "comments"), commentId);
        const commentDoc = await getDoc(commentRef);
      
        if (!commentDoc.exists()) {
          throw new Error(`Comment not found with id ${commentId}`);
        }
      
        const userId = commentDoc.data().userId;
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
      
        if (!userDoc.exists()) {
          throw new Error(`User not found with id ${userId}`);
        }
      
        const username = userDoc.data().username;
        return username;
      }


  return (
    <div className='border border-gray-400 border-t-1 border-b-0 border-l-0 border-r-0 w-full'>
        <div className='flex flex-col p-6'>
            <div className='flex mb-3 justify-between'>
                <div className='flex'>
                    <img className="self-start w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                    <div className='flex flex-col'>
                        <span>{username}</span>
                        <span>{date + " " + time}</span>
                    </div>
                </div>
                <div>
                    <div className='hover:text-orange-500 transition flex flex-row-reverse gap-2 items-center '>
                        <span> Like</span>
                        <FiThumbsUp />
                    </div>
                </div>
            </div>
            <div>
                {comment}
            </div>
        </div>
    </div>
  )
}

export default Comment