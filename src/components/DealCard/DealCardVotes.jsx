import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserAuth } from '../../context/AuthContext';
import { BsHourglassBottom } from 'react-icons/bs';

function VoteButton({ onClick, disabled, text }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-${text}-500 font-bold text-2xl hover:bg-${text}-100 rounded-full h-8 w-8 items-center justify-center flex ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text === 'blue' ? '–' : '+'}
    </button>
  );
}

function DealCardVotes({ postId, archived }) {
  const { user } = UserAuth();
  const likesCollection = collection(db, 'deals', postId, 'likes');
  const dislikesCollection = collection(db, 'deals', postId, 'dislikes');
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const getLikes = async () => {
    const data = await getDocs(likesCollection);
    setLikes(data.docs);
    setUserLiked(data.docs.some(doc => doc.id === user?.uid));
  };

  const getDislikes = async () => {
    const data = await getDocs(dislikesCollection);
    setDislikes(data.docs);
    setUserDisliked(data.docs.some(doc => doc.id === user?.uid));
  };

  const handleVote = async (voteType) => {
    try {
      const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
      const oppositeVoteType = voteType === 'like' ? 'dislike' : 'like'; // Determine the opposite vote type
  
      const userHasVoted = likes.some(doc => doc.id === user?.uid) || dislikes.some(doc => doc.id === user?.uid);
  
      if (userHasVoted) {
        // User has already voted, remove the opposite vote
        await deleteVote(oppositeVoteType);
      }
  
      const voteRef = doc(collection(db, 'deals', postId, voteCollection), user?.uid);
      await setDoc(voteRef, {});
  
      // Update the vote counts and user vote status immediately after the vote is added
      await getLikes();
      await getDislikes();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteVote = async (voteType) => {
    try {
      const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
      const voteToDelete = doc(db, 'deals', postId, voteCollection, user?.uid);
      await deleteDoc(voteToDelete);
  
      // Update the vote counts immediately after the vote is deleted
      await getLikes();
      await getDislikes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
    getDislikes();
  }, []);

  if (archived) {
    return (
      <div className='relative flex justify-center items-center gap-5 rounded-l-full rounded-r-full border w-36 h-8 py-4 mb-2'>
        <span className='font-bold text-lg'> {likes.length - dislikes.length || 0} </span>
        <div className='flex text-lg items-center gap-1'>
          <BsHourglassBottom size={"1.2em"} /> 
          <span> Ended </span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setUserLiked(likes.some(doc => doc.id === user?.uid));
    setUserDisliked(dislikes.some(doc => doc.id === user?.uid));
  }, [likes, dislikes, user]);

  return (
    <div className='relative flex justify-between items-center gap-2 rounded-l-full rounded-r-full border w-28 h-8 py-4 mb-2'>
      <VoteButton onClick={() => handleVote('dislike')} disabled={userDisliked} text="blue" />
      <span className='font-bold text-lg'> {likes.length - dislikes.length || 0} </span>
      <VoteButton onClick={() => handleVote('like')} disabled={userLiked} text="orange" />
    </div>
  );
}

export default DealCardVotes;
