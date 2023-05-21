import React, { useEffect, useState } from 'react'

import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { UserAuth } from '../../context/AuthContext'

function DealCardVotes({ postId }) {

    const { user } = UserAuth()
    const likesQuery = query(collection(db, "likes"), where("postId", "==", postId));
    const dislikesQuery = query(collection(db, "dislikes"), where("postId", "==", postId));
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
  
    const getLikes = async () => {
      const data = await getDocs(likesQuery)
      setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
    }
  
    const getDislikes = async () => {
      const data = await getDocs(dislikesQuery)
      setDislikes(data.docs.map((doc) => ({ userId: doc.data().userId, dislikeId: doc.id })))
    }
  
    const handleVote = async (voteType) => {
      try {
        const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
        const voteRef = collection(db, voteCollection);
        const newDoc = await addDoc(voteRef, { userId: user.uid, postId });
        const voteState = voteType === 'like' ? { userId: user.uid, likeId: newDoc.id } : { userId: user.uid, dislikeId: newDoc.id };
        const setVoteState = voteType === 'like' ? setLikes : setDislikes;
  
        if (userDisliked && voteType === 'like') {
          deleteDislike();
        }
        if (userLiked && voteType === 'dislike') {
          deleteLike();
        }
        if (user) {
          setVoteState((prev) => (prev ? [...prev, voteState] : [voteState]));
        }
      } catch (err) {
        console.log(err);
      }
    };
        
    const deleteVote = async (voteType) => {
      try {
        const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
        const voteRef = collection(db, voteCollection);
        const voteToDeleteQuery = query(voteRef, where('postId', '==', postId), where('userId', '==', user.uid));
        const voteToDeleteSnapshot = await getDocs(voteToDeleteQuery);
        const voteToDeleteDocs = voteToDeleteSnapshot.docs;
        if (voteToDeleteDocs.length > 0) {
          const voteId = voteToDeleteDocs[0].id;
          const voteToDelete = doc(db, voteCollection, voteId);
          await deleteDoc(voteToDelete);
          const voteState = voteType === 'like' ? setLikes : setDislikes;
          if (user) {
            voteState((prev) => prev.filter((vote) => vote.likeId !== voteId && vote.dislikeId !== voteId));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    const addLike = () => handleVote('like');
    const addDislike = () => handleVote('dislike');
    const deleteLike = () => deleteVote('like');
    const deleteDislike = () => deleteVote('dislike');
    
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