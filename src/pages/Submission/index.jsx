import React, { useState } from 'react'

import { UserAuth } from '../../context/AuthContext'
import PreviewDealModal from './PreviewDealModal'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, storage } from '../../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { FormProvider, useForm } from 'react-hook-form'
import FormDealLink from './FormDealLink'
import FormImageUpload from './FormImageUpload'
import FormTitle from './FormTitle'
import FormDescription from './FormDescription'
import FormPriceDetails from './FormPriceDetails'
import FormFinalDetails from './FormFinalDetails'
import { useNavigate } from 'react-router-dom'

function Submission() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const methods = useForm()
  const navigate = useNavigate()

  const [openDealPreview, setOpenDealPreview] = useState(false)

  const { user, userData } = UserAuth()

  const TITLE_CHARACTER_LIMIT = 100
  const DESCRIPTION_CHARACTER_LIMIT = 500

  const formDetailsObj = {
    dealLink: "",
    images: [],
    title: "",
    description: "",
    price: "",
    nextBestPrice: "",
    freeShipping: false,
    shippingCost: "",
    voucherCode: "",
    category: ""
  }

  const [formDetails, setFormDetails] = useState(formDetailsObj)

  const handleInputChange = (e) => {

    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value
    })

  }

  const handleCheckChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.checked ? true : false
    })
  }

  const submitData = async () => {
    // e.preventDefault()

    const dealsCollection = collection(db, "deals")

    const newDocRef = doc(dealsCollection)

    const newDocId = newDocRef.id

    await setDoc(newDocRef, {
      owner: userData.username || 'test',
      dealLink: formDetails.dealLink,
      title: formDetails.title,
      description: formDetails.description,
      price: formDetails.price,
      nextBestPrice: formDetails.nextBestPrice,
      posted: serverTimestamp(),
      category: formDetails.category,
      voucherCode: formDetails.voucherCode,
      shippingCost: formDetails.shippingCost,
      userId: user.uid
    })
    
    submitImages(newDocId)
    navigate('/')
  }
  
  const submitImages = (docId) => {
    for (let i = 0; i < formDetails.images.length; i++) {
      if (formDetails.images[i]) {
        const imageRef = ref(storage, `images/${docId}/${i}`)
        uploadBytes(imageRef, formDetails.images[i])
      } else {
        return
      }
    }
  }

  const toggleOpenDealPreview = () => {
    setOpenDealPreview(!openDealPreview)
  }

  return (
    <div className='bg-slate-400 w-full h-full'>

    {openDealPreview && 
      <PreviewDealModal               
        title={formDetails.title || "Your Title"}
        date={"1/1/2022"} 
        time={"1:00"}
        owner={userData.username}
        price={formDetails.price || 100}
        lastBestPrice={formDetails.lastBestPrice || 200}
        upvotes={100}
        description={formDetails.description || "Your wonderful description appears right here"} 
        toggleOpenDealPreview={toggleOpenDealPreview}
        shippingCost={formDetails.shippingCost || 2.99}
        profileUrl={userData.profileUrl}
      />}


      <FormProvider {...methods}>
        <form 
        onSubmit={methods.handleSubmit(() => submitData())}
        className='flex flex-col p-5 bg-white ml-auto mr-auto sm:max-w-[750px]'
        >

          <h1 className='text-2xl font-bold'> Add a new deal </h1>
          <hr className='mb-4 mt-4'></hr>

          <FormDealLink
            formDetails={formDetails}
            handleInputChange={handleInputChange}
          />

          <hr className='mb-4 mt-4'></hr>

          <FormImageUpload
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
                          
          <FormTitle 
            formDetails={formDetails}
            handleInputChange={handleInputChange}
            TITLE_CHARACTER_LIMIT={TITLE_CHARACTER_LIMIT}
          />

          <FormDescription 
            handleInputChange={handleInputChange}
            formDetails={formDetails}
            DESCRIPTION_CHARACTER_LIMIT={DESCRIPTION_CHARACTER_LIMIT}
          />
            
            <hr className='mb-4 mt-4'></hr>

            <h3 className='text-2xl font-bold mb-4'> Price details </h3>
            
            <FormPriceDetails
              handleCheckChange={handleCheckChange}
              handleInputChange={handleInputChange}
              formDetails={formDetails}
             />

            <FormFinalDetails 
              formDetails={formDetails}
              handleInputChange={handleInputChange}
            />
            
            <div className='flex gap-3 items-center mt-4 sm:justify-end justify-center w-ful'>
              <button 
                onClick={toggleOpenDealPreview} 
                className='bg-white hover:bg-gray-200 border transition-all text-gray-500 py-2 px-5 rounded-3xl'> Preview 
              </button>
              <button 
                type="submit" 
                className='bg-orange-500 hover:bg-orange-400 transition-all text-white py-2 px-5 rounded-3xl'> Publish </button>
            </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Submission