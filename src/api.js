import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './config/firebase';
import { doc, updateDoc, serverTimestamp, where, addDoc, query, collection, getDoc, getDocs, deleteDoc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./config/firebase";

export async function fetchProfileImage(userId, setProfileUrl) {
  try {
    const imageRef = ref(storage, `profileImages/${userId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    setProfileUrl(imageUrl);
  } catch (error) {
    const genericRef = ref(storage, "profileImages/avatar.png")
    const genericUrl = await getDownloadURL(genericRef);
    setProfileUrl(genericUrl);
    console.log('Error fetching profile image:', error);
  }
}

export const checkSavedDeal = async (setHasSaved, userId, postId) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedDealRef = doc(savedRef, postId);

  const savedDeal = await getDoc(savedDealRef);
  setHasSaved(savedDeal.exists());
};

export const toggleSaved = async (hasSaved, setHasSaved, userId, postId) => {
  const userRef = doc(db, "users", userId);
  const savedRef = collection(userRef, "saved");
  const savedPostRef = doc(savedRef, postId);

  const savedPost = await getDoc(savedPostRef);

  if (savedPost.exists()) {
    // post is already saved, so remove it
    await deleteDoc(savedPostRef);
    if (hasSaved) setHasSaved(false)
  } else {
    // post is not saved, so add it
    await setDoc(savedPostRef, {});
    if (!hasSaved) setHasSaved(true)
  }
};

export async function getLikesAndDislikes(postId) {
  const likesCollection = collection(db, 'deals', postId, 'likes');
  const dislikesCollection = collection(db, 'deals', postId, 'dislikes');
  
  const likesData = await getDocs(likesCollection);
  const dislikesData = await getDocs(dislikesCollection);
  
  return {
    likes: likesData.docs,
    dislikes: dislikesData.docs,
  };
}

export async function handleVote(postId, voteType, user) {
  try {
    const collectionName = voteType === 'like' ? 'likes' : 'dislikes';
    const oppositeCollectionName = voteType === 'like' ? 'dislikes' : 'likes';

    const voteRef = doc(collection(db, 'deals', postId, collectionName), user?.uid);

    // Check if the document exists before trying to delete it
    const docSnapshot = await getDoc(voteRef);

    // Remove the user's vote from the opposite collection if it exists
    const oppositeVoteRef = doc(collection(db, 'deals', postId, oppositeCollectionName), user?.uid);
    const oppositeDocSnapshot = await getDoc(oppositeVoteRef);

    const batch = writeBatch(db);

    if (!docSnapshot.exists()) {
      // If the document doesn't exist, add it to the current collection
      batch.set(voteRef, {});

      if (oppositeDocSnapshot.exists()) {
        // If the user has a vote in the opposite collection, remove it
        batch.delete(oppositeVoteRef);
      }
    } else {
      // If the document exists, delete it
      batch.delete(voteRef);
    }

    // Commit the batch write
    await batch.commit();

    return true;
  } catch (err) {
    console.error('Error in handleVote:', err);
    return false;
  }
}

export async function fetchSearchResults(searchQuery) {
  const dealsRef = collection(db, 'deals');
  const lowercaseQuery = searchQuery.toLowerCase();
  const q = query(dealsRef);

  try {
    const querySnapshot = await getDocs(q);
    let results = [];

    if (lowercaseQuery.trim() !== '') {
      results = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const dealData = doc.data();
          const likesSnapshot = await getDocs(collection(dealsRef, doc.id, 'likes'));
          const dislikesSnapshot = await getDocs(collection(dealsRef, doc.id, 'dislikes'));
          const likesCount = likesSnapshot.size;
          const dislikesCount = dislikesSnapshot.size;

          let imageURL;

          if (dealData.imageURLs) {
            const imagePath = Array.isArray(dealData.imageURLs)
              ? dealData.imageURLs[0] // First element of the array
              : dealData.imageURLs;   // String value

            const storageRef = ref(storage, imagePath);

            try {
              imageURL = await getDownloadURL(storageRef);
            } catch (error) {
              console.error('Error fetching image download URL:', error);
            }
          }

          return {
            id: doc.id,
            data: {
              ...dealData,
              likesCount,
              dislikesCount,
              imageURL
            },
          };
        })
      );

      results = results
        .filter((result) => result.data.title.toLowerCase().includes(lowercaseQuery))
        .sort((a, b) => a.data.title.localeCompare(b.data.title))
        .slice(0, 5); // Extract only the first 5 results
    }

    return results;
  } catch (error) {
    console.error('Error searching for deals:', error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, 'itemCategories'));
    const categories = querySnapshot.docs.map((doc) => doc.data());
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Function to fetch the profile URL of a user
export async function getProfileUrlFromUserId(userId) {
  const storageRef = ref(storage, `profileImages/${userId}/image`);
  const profileImageUrl = await getDownloadURL(storageRef);
  return profileImageUrl;
}

// Function to fetch a username from a comment
export async function getUsernameFromComment(commentId, dealId) {
  const commentRef = doc(collection(doc(db, `deals/${dealId}`), 'comments'), commentId);
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error(`Comment not found with id ${commentId}`);
  }

  const userId = commentDoc.data().userId;
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error(`User not found with id ${userId}`);
  }

  const username = userDoc.data().username;
  return username;
}

// Function to toggle like on a comment
export async function toggleCommentLike(dealId, commentId, userId) {
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
    } else {
      // User has not liked the comment, so add the like
      await addDoc(likesCollectionRef, { userId });
    }
  } catch (error) {
    console.error('Error toggling comment like:', error);
  }
}

// Function to fetch the number of likes for a comment
export async function fetchCommentLikeCount(dealId, commentId) {
  const likesCollectionRef = collection(db, `deals/${dealId}/comments/${commentId}/likes`);

  try {
    const commentLikesSnapshot = await getDocs(likesCollectionRef);
    const likeCount = commentLikesSnapshot.size;
    return likeCount;
  } catch (error) {
    console.error('Error fetching comment like count:', error);
    return 0; // Return 0 in case of an error
  }
}

// Function to check if the current user has already liked the comment
export async function checkUserLiked(postId, commentId, userId) {
  const likesCollectionRef = collection(db, `deals/${postId}/comments/${commentId}/likes`);

  try {
    const commentLikesQuery = query(likesCollectionRef, where('userId', '==', userId));
    const commentLikesSnapshot = await getDocs(commentLikesQuery);
    const userHasLiked = !commentLikesSnapshot.empty;
    return userHasLiked;
  } catch (error) {
    console.error('Error checking user liked status:', error);
    return false; // Return false in case of an error
  }
}

// Function to post comment
export const submitComment = async (postId, newComment) => {
  try {
    const postCommentsCollectionRef = collection(db, 'deals', postId, 'comments');
    const newCommentDocRef = doc(postCommentsCollectionRef);

    await setDoc(newCommentDocRef, {
      userId: newComment.userId,
      comment: newComment.comment,
      posted: serverTimestamp(),
    });

    // Fetch the updated comments after submitting a new comment
    const commentsSnapshot = await getDocs(collection(db, 'deals', postId, 'comments'));
    const updatedComments = [];
    commentsSnapshot.forEach((commentDoc) => {
      updatedComments.push({
        id: commentDoc.id,
        ...commentDoc.data(),
      });
    });

    return updatedComments;
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};

// Function to get imges for slider
export const getImages = async (imageURLs) => {
  const imageList = [];
  const urlsToFetch = Array.isArray(imageURLs) ? imageURLs : [imageURLs]; // To handle both arrays and single images (strings)

  try {
    for (const imageURL of urlsToFetch) {
      // Create a reference to the image based on the provided imageURL
      const imageRef = ref(storage, imageURL);

      try {
        // Fetch the download URL for the image
        const url = await getDownloadURL(imageRef);
        imageList.push({ url }); // Wrap the URL in an object with a 'url' property
      } catch (error) {
        // Handle error for individual images
        console.error(`Error fetching image at ${imageURL}:`, error);
      }
    }

    return imageList;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

// Function to fetch deals
export async function fetchDeals() {
  try {
    const querySnapshot = await getDocs(collection(db, 'deals'));
    const dealList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const dealData = doc.data();
        const commentsSnapshot = await getDocs(collection(doc.ref, 'comments'));
        const commentsCount = commentsSnapshot.size;
        return { id: doc.id, ...dealData, comments: commentsCount };
      })
    );
    return dealList;
  } catch (err) {
    console.error('Error fetching deals:', err);
    throw err;
  }
}

export async function fetchSavedDeals(userId) {
  try {
    const savedRef = collection(db, 'users', userId, 'saved');
    const savedSnapshot = await getDocs(savedRef);
    const savedDealIds = savedSnapshot.docs.map((doc) => doc.id);

    if (savedDealIds.length === 0) {
      // No saved deals, no need to query
      return [];
    }

    const dealsQuery = query(collection(db, 'deals'), where('__name__', 'in', savedDealIds));
    const querySnapshot = await getDocs(dealsQuery);

    const fetchedDeals = [];
    querySnapshot.forEach((doc) => {
      const dealData = doc.data();
      const commentsSnapshot = getDocs(collection(doc.ref, 'comments'));
      const commentsCount = commentsSnapshot.size;
      fetchedDeals.push({ id: doc.id, ...dealData, comments: commentsCount });
    });

    return fetchedDeals;
  } catch (err) {
    console.error('Error fetching saved deals:', err);
    return [];
  }
}

export const fetchDealData = async (dealId) => {
  try {
    const dealRef = doc(db, "deals", dealId);
    const dealSnapshot = await getDoc(dealRef);

    if (dealSnapshot.exists()) {
      const dealData = dealSnapshot.data();
      const commentsSnapshot = await getDocs(collection(dealRef, "comments"));
      const commentsCount = commentsSnapshot.size;
      return { id: dealSnapshot.id, ...dealData, comments: commentsCount };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Fetch deal comments

export const fetchComments = async (dealId) => {
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

    return comments;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Fetch profile image

export const fetchProfileImageById = async (currentUserId) => {
  try {
    const imageRef = ref(storage, `profileImages/${currentUserId}/image`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.log('Error fetching profile image:', error);
    return null;
  }
};

// Update deal details

export const updateDealDetails = async (dealId, editedDealDetails) => {
  try {
    const dealRef = doc(db, "deals", dealId);
    await updateDoc(dealRef, editedDealDetails);
    console.log('Deal details updated successfully.');
    return true;
  } catch (error) {
    console.error('Error updating deal details:', error);
    return false;
  }
};

// Set deal to archived

export const archiveDeal = async (dealId, archived) => {
  try {
    const dealRef = doc(db, 'deals', dealId);
    await updateDoc(dealRef, {
      archived: !archived, // Set 'archived' to true
    });
    return true;
  } catch (error) {
    console.error('Error archiving deal:', error);
    return false;
  }
};

// Submit deal

export const submitDeal = async (formData, userData, user) => {
  try {
    const dealsCollection = collection(db, "deals");
    const newDocRef = doc(dealsCollection);
    const newDocId = newDocRef.id;

    await setDoc(newDocRef, {
      owner: userData.username || 'test',
      dealLink: formData.dealLink,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      nextBestPrice: formData.nextBestPrice,
      posted: serverTimestamp(),
      category: formData.category,
      voucherCode: formData.voucherCode,
      shippingCost: formData.shippingCost,
      userId: user.uid,
    });

    await submitImages(newDocId, formData.images);
    
    return true; // Submission successful
  } catch (error) {
    console.error('Error submitting deal:', error);
    return false; // Submission failed
  }
};

// Submit images

const submitImages = async (docId, images) => {
  const imageURLs = [];

  for (let i = 0; i < images.length; i++) {
    if (images[i]) {
      const imageRef = ref(storage, `images/${docId}/${i}`);
      await uploadBytes(imageRef, images[i]);
      const imageURL = `/images/${docId}/${i}`;
      imageURLs.push(imageURL);
    }
  }

  // After uploading all images, update the deal document with imageURLs
  const dealDocRef = doc(db, 'deals', docId);
  await updateDoc(dealDocRef, { imageURLs });
};