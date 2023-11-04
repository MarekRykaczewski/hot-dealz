// Submit images

import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../config/firebase";

const submitImages = async (docId: string, images: any[]) => {
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
  const dealDocRef = doc(db, "deals", docId);
  await updateDoc(dealDocRef, { imageURLs });
};
