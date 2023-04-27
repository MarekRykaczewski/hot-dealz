import React, { useRef, useState } from 'react'

import { UserAuth } from '../context/AuthContext'
import CategorySelector from '../components/CategorySelector'
import Tooltip from '../components/Tooltip'
import PreviewDealModal from '../components/PreviewDealModal'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, storage } from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { FormProvider, useForm } from 'react-hook-form'
import FormDealLink from '../components/FormDealLink'
import FormImageUpload from '../components/FormImageUpload'
import FormTitle from '../components/FormTitle'

function Submission() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const methods = useForm()

  console.log(errors)

  const [openDealPreview, setOpenDealPreview] = useState(false)

  const { userData } = UserAuth()

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
    category: "",
    startDate: "",
    endDate: ""
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

  const submitData = async (e) => {
    e.preventDefault()

    const dealsCollection = collection(db, "deals")

    const newDocRef = doc(dealsCollection)

    const newDocId = newDocRef.id

    await setDoc(newDocRef, {
      owner: userData.username,
      dealLink: formDetails.dealLink,
      imageCount: formDetails.images.length, // No way to count folder items via Firebase, so this is needed.
      title: formDetails.title,
      description: formDetails.description,
      price: formDetails.price,
      nextBestPrice: formDetails.nextBestPrice,
      upvotes: 0,
      posted: serverTimestamp(),
    })
    
    submitImages(newDocId)

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
      />}


      <FormProvider {...methods}>
        <form 
        onSubmit={methods.handleSubmit(() => submitData())}
        className='flex flex-col p-5 bg-white ml-auto mr-auto w-[700px]'
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

            <div className='flex justify-between items-center'>
              <h3 className='text-sm font-bold text-gray-500 mb-2'> Description </h3>
              <span className='text-xs text-gray-500'> {DESCRIPTION_CHARACTER_LIMIT - formDetails.description.length} Characters remaining </span>
            </div>
            
            <Tooltip text={"Tell us about your deal"} subtext={"Include details about the product, links to any relevant info/reviews, and why you think it's a deal worth sharing"}>
            <textarea
              {...register("description", { 
                required: "This is required", 
                maxLength: {
                  value: DESCRIPTION_CHARACTER_LIMIT,
                  message: `Max length is ${DESCRIPTION_CHARACTER_LIMIT}`
                } 
              })}  
              name='description' 
              value={formDetails.description} 
              onChange={handleInputChange} 
              maxLength={DESCRIPTION_CHARACTER_LIMIT} 
              className='resize-none border rounded-md p-3 focus:outline-orange-500 w-full h-[300px]' 
              type="text" 
              placeholder='Here you can describe the deal in your own words and explain to other users why it is a good deal!' />
            </Tooltip>
            
            <hr className='mb-4 mt-4'></hr>

            <h3 className='text-2xl font-bold mb-4'> Price details </h3>
            
            <div className='flex flex-col gap-3 items-center justify-start'>
              <div className='flex w-full justify-start items-center gap-4'>
                <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
                  <div className='flex flex-col w-max '>
                    <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="price">Price </label>
                    <input 
                      {...register("price", { required: "This is required." })} 
                      name='price' 
                      value={formDetails.price} 
                      onChange={handleInputChange} 
                      className='border rounded-md p-1 focus:outline-orange-500 mb-3' 
                      type="text" 
                    />
                  </div>
                </Tooltip>
              
                <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
                <div className='flex flex-col w-max'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="nextBestPrice">Next best price</label>
                  <input 
                    {...register("nextBestPrice", { required: "This is required." })} 
                    name='nextBestPrice' 
                    value={formDetails.nextBestPrice} 
                    onChange={handleInputChange} 
                    className='border rounded-md p-1 focus:outline-orange-500 mb-3'
                    type="text" 
                  />
                </div>
                </Tooltip> 
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Shipping cost</label>
                  <input 
                    {...register("shippingCost", { required: "This is required." })} 
                    name='shippingCost' 
                    value={formDetails.shippingCost} 
                    onChange={handleInputChange} 
                    className='border rounded-md p-1 focus:outline-orange-500 mb-3' 
                    type="text" 
                  />
                </div>

                <div className='flex flex-row-reverse gap-2 items-center mt-7 mb-3'>
                  <label className='text-sm font-bold text-gray-500' htmlFor="">Free shipping?</label>
                  <input 
                    {...register("freeShipping", { required: "This is required." })} 
                    onChange={(e) => handleCheckChange(e)} 
                    type="checkbox" 
                  />
                </div>
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Voucher Code </label>
                  <input
                    {...register("voucherCode", { required: "This is required." })} 
                    name='voucherCode' 
                    value={formDetails.voucherCode} 
                    onChange={handleInputChange} 
                    className='border rounded-md p-1 focus:outline-orange-500 mb-3' 
                    type="text" />
                  </div>
              </div>
            </div>

            <div>
              <hr className='mb-4 mt-4'></hr>
              
              <h3 className='text-2xl font-bold mb-4'> Final details </h3>
              
              <span className='text-sm font-bold text-gray-500' >Categories</span>
              <span className='text-xs text-gray-500 mb-3'> Which of these categories best describes your deal?</span>
            </div>
           
            <CategorySelector 
              handleInputChange={handleInputChange}
            />

            <div className='flex flex-col items-start gap-3'>
              <label className='text-sm font-bold text-gray-500' htmlFor=""> Start Date </label>
              <input 
                name='startDate' 
                value={formDetails.startDate} 
                onChange={handleInputChange} 
                className='border rounded-md p-1 focus:outline-orange-500' 
                type="date" 
                placeholder='DD/MM/YYYY' 
              />
              <label className='text-sm font-bold text-gray-500' htmlFor=""> End Date </label>
              <input 
                name='endDate' 
                value={formDetails.endDate} 
                onChange={handleInputChange} 
                className='border rounded-md p-1 focus:outline-orange-500' 
                type="date" 
                placeholder='DD/MM/YYYY' />
            </div>
            
            <div className='flex gap-3 items-center justify-end w-ful'>
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