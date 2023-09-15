// React
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// Icons
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
// Components
import CommentSection from '../../../components/CommentSection'
// Firebase
import { collection, getDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { auth, storage } from '../../../config/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
// Utils
import { sortCommentsByNewest } from '../../../utils'
import { toggleSaved, checkSavedDeal } from '../../../utils'
import DealCardDetailed from '../../../components/DealCard/DealCardDetailed'
import DealCardControls from '../../../components/DealCard/DealCardControls';
import EditDealFormModal from '../../../components/DealCard/EditDealFormModal'

function DealDetails() {

  const currentUserId = auth.currentUser?.uid
  const [hasSaved, setHasSaved] = useState(false)
  const [deal, setDeal] = useState([])
  const { title, imageURLs, userId, archived, posted, owner, price, nextBestPrice, description, shippingCost, dealLink, voucherCode } = deal
  const { dealId } = useParams();
  const [comments, setComments] = useState([])
  const commentInput = useRef(null)
  const [profileUrl, setProfileUrl] = useState('')
  const [isArchived, setIsArchived] = useState(archived);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleSaveChanges = async (editedDealDetails) => {
    try {
      const dealRef = doc(db, "deals", dealId);
  
      // Update the deal details in Firebase Firestore
      await updateDoc(dealRef, editedDealDetails);
  
      console.log('Deal details updated successfully.');
      setIsEditModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error('Error updating deal details:', error);
    }
  };

  const handleArchiveClick = async () => {
    try {
      // Reference the specific deal document
      const dealRef = doc(db, 'deals', dealId);

      // Update the 'archived' status of the deal in Firebase Firestore
      await updateDoc(dealRef, {
        archived: !archived, // Set 'archived' to true
      });

      setIsArchived((prevIsArchived) => !prevIsArchived);

    } catch (error) {
      console.error('Error archiving deal:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleString()
  }

  const formattedDateTime = posted && formatDate(posted)
  
  const focusElement = () => {
    commentInput.current && commentInput.current.focus()
    commentInput.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
  }

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
    try {
      const querySnapshot = await getDocs(collection(db, "deals", dealId, "comments"));
  
      const comments = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const commentData = doc.data();
          const likesSnapshot = await getDocs(collection(db, "deals", dealId, "comments", doc.id, "likes"));
          const likes = likesSnapshot.docs.map((likeDoc) => likeDoc.data());
          return { id: doc.id, ...commentData, likes };
        })
      );
  
      sortCommentsByNewest(comments, setComments);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const imageRef = ref(storage, `profileImages/${currentUserId}/image`);
      const imageUrl = await getDownloadURL(imageRef);
      setProfileUrl(imageUrl);
    } catch (error) {
      console.log('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [currentUserId]);

  useEffect(() => {
    fetchData(dealId)
  }, [])
    
  useEffect(() => {
    if (currentUserId) {
      checkSavedDeal(setHasSaved, currentUserId, dealId);
    }
  }, []);

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
		setIsArchived(archived)
	}, [archived])

  const isOwner = currentUserId === userId

  return (
    <div className='bg-slate-200 w-full flex flex-col ml-auto mr-auto items-center justify-start'>
      {isOwner && <DealCardControls 
        onEditClick={() => setIsEditModalOpen(true)} dealId={dealId} 
        isArchived={isArchived} 
        handleArchiveClick={handleArchiveClick} 
        />
      }
      <DealCardDetailed
        dealId={dealId}
        title={title}
        dealLink={dealLink}
        owner={owner}
        price={price}
        nextBestPrice={nextBestPrice}
        description={description}
        posted={formattedDateTime}
        userId={userId}
        shippingCost={shippingCost}
        voucherCode={voucherCode}
        profileUrl={profileUrl}
        imageURLs={imageURLs}
        isArchived={isArchived}
      />
      <EditDealFormModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialTitle={title}
        initialPrice={price}
        initialNextBestPrice={nextBestPrice}
        initialShippingCost={shippingCost}
        initialDealLink={dealLink}
        initialVoucherCode={voucherCode}
        onSave={handleSaveChanges}
        />
      <div className='flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg overflow-hidden'>
          <div className='p-5'>
            <h1 className='font-bold'>About this deal</h1>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
          <div className='bg-slate-300 flex gap-4 w-full px-6 py-3'>
            <button onClick={() => focusElement()} className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>New comment <BiCommentDetail /></button>
            <button onClick={() => toggleSaved(hasSaved, setHasSaved, currentUserId, dealId)} className='flex flex-row-reverse gap-2 items-center justify-center hover:text-orange-500 transition'>Save for later {hasSaved ? <BsFillBookmarkFill /> : <BsBookmark />}</button>
          </div>
      </div>
      <CommentSection commentInput={commentInput} postId={dealId} comments={comments} setComments={setComments} />
    </div>
  )
}

export default DealDetails