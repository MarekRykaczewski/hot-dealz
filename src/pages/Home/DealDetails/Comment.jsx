import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { FiThumbsUp } from 'react-icons/fi'
import { storage } from '../../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

function Comment({ userId, postId, commentId, comment, date, time }) {

    const [username, setUsername] = useState()
    const [profileUrl, setProfileUrl] = useState()
    const [liked, setLiked] = useState(false)

    async function getUsername() {
        const username = await getUsernameFromComment(commentId, postId)
        setUsername(username)
    }

    async function getProfileUrl() {
        const url = await getProfileUrlFromUserId(userId)
        setProfileUrl(url)
    }

    useEffect(() => {
        getUsername()
    }, [])

    useEffect(() => {
        getProfileUrl(userId)
    }, [])

    async function getProfileUrlFromUserId(userId) {
        const storageRef = ref(storage, `profileImages/${userId}/image`);
        const profileImageUrl = await getDownloadURL(storageRef);
        
        return profileImageUrl;
      }
         
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

    // Function to toggle like on a comment
    async function toggleCommentLike(dealId, commentId, userId) {
        const likesCollectionRef = collection(db, `deals/${dealId}/comments/${commentId}/likes`);
    
        try {
        // Check if the user has already liked the comment
        const commentLikesQuery = query(likesCollectionRef, where('userId', '==', userId));
        const commentLikesSnapshot = await getDocs(commentLikesQuery);
        const userHasLiked = !commentLikesSnapshot.empty;
    
        if (userHasLiked) {
            // User has already liked the comment, so remove the like
            const likeDoc = commentLikesSnapshot.docs[0];
            await deleteDoc(doc(likesCollectionRef, likeDoc.id));
            setLiked(false)
        } else {
            // User has not liked the comment, so add the like
            const newLikeDoc = await addDoc(likesCollectionRef, { userId });
            setLiked(true)
        }
        } catch (error) {
        // Handle any errors that occurred
        console.error('Error toggling comment like:', error);
        }
    }

    useEffect(() => {
        // Fetch initial liked status of the comment when the component mounts
        const fetchLikedStatus = async () => {
          try {
            const commentLikesQuery = query(
              collection(db, `deals/${postId}/comments/${commentId}/likes`),
              where('userId', '==', userId)
            );
            const commentLikesSnapshot = await getDocs(commentLikesQuery);
            const userHasLiked = !commentLikesSnapshot.empty;
            setLiked(userHasLiked);
          } catch (error) {
            console.error('Error fetching comment like status:', error);
          }
        };
    
        fetchLikedStatus();
      }, [postId, commentId, userId]);


  return (
    <div className='border border-gray-400 border-t-1 border-b-0 border-l-0 border-r-0 w-full'>
        <div className='flex flex-col p-6'>
            <div className='flex mb-3 justify-between'>
                <div className='flex'>
                    <img className="self-start w-10 h-10 rounded-full mr-4" src={profileUrl} alt="Avatar of Jonathan Reinink" />
                    <div className='flex flex-col'>
                        <span>{username}</span>
                        <span>{date + " " + time}</span>
                    </div>
                </div>
                <div>
                    <button onClick={() => toggleCommentLike(postId, commentId, userId)} className={`hover:text-orange-500 ${liked && "text-orange-500 font-bold"} cursor-pointer transition flex flex-row-reverse gap-2 items-center`}>
                        <div> {liked ? "Liked" : "Like"}</div>
                        <FiThumbsUp color={liked ? "orange" : "gray" } />
                    </button>
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