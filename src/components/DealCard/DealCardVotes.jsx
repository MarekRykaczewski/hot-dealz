import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserAuth } from '../../context/AuthContext';

function DealCardVotes({ postId }) {
  const { user } = UserAuth();
  const likesCollection = collection(db, 'deals', postId, 'likes');
  const dislikesCollection = collection(db, 'deals', postId, 'dislikes');
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const getLikes = async () => {
    const data = await getDocs(likesCollection);
    setLikes(data.docs);
  };

  const getDislikes = async () => {
    const data = await getDocs(dislikesCollection);
    setDislikes(data.docs);
  };

  const handleVote = async (voteType) => {
    try {
      const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
      const userHasLiked = likes.includes(user.uid);
      const userHasDisliked = dislikes.includes(user.uid);
  
      if (voteType === 'like' && userHasDisliked) {
        // User liked a post they had previously disliked, remove the dislike
        await deleteDislike();
      } else if (voteType === 'dislike' && userHasLiked) {
        // User disliked a post they had previously liked, remove the like
        await deleteLike();
      }
  
      const voteRef = doc(collection(db, 'deals', postId, voteCollection), user.uid);
      await setDoc(voteRef, {});
      const voteState = voteType === 'like' ? user.uid : user.uid;
      const setVoteState = voteType === 'like' ? setLikes : setDislikes;
  
      if (user) {
        setVoteState((prev) => [...prev, voteState]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteVote = async (voteType) => {
    try {
      const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
      const voteToDelete = doc(db, "deals", postId, voteCollection, user.uid);
      await deleteDoc(voteToDelete)
      
      const voteState = voteType === 'like' ? setLikes : setDislikes;
        
      if (user) {
        voteState((prev) => prev.filter((vote) => vote !== user.uid));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addLike = () => handleVote('like');
  const addDislike = () => handleVote('dislike');
  const deleteLike = () => deleteVote('like');
  const deleteDislike = () => deleteVote('dislike');

  const userLiked = likes.includes(user?.uid);
  const userDisliked = dislikes.includes(user?.uid);

  console.log(dislikes, "dislikes")
  console.log(likes, "likes")

  useEffect(() => {
    getLikes();
    getDislikes();
  }, []);

  return (
    <div className='relative flex justify-between items-center gap-2 rounded-l-full rounded-r-full border w-28 h-8 py-4 mb-2'>
      <button onClick={userDisliked ? deleteDislike : addDislike} className='text-blue-500 font-bold text-2xl hover:bg-blue-100 rounded-full h-8 w-8 items-center justify-center flex'>–</button>
      <span className='font-bold text-lg'> {likes.length - dislikes.length || 0} </span>
      <button onClick={userLiked ? deleteLike : addLike} className='text-orange-500 font-bold text-2xl hover:bg-orange-100 rounded-full h-8 w-8 items-center justify-center flex'>+</button>
    </div>
  );
}

export default DealCardVotes;
