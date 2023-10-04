import React, { useState } from 'react'

import { UserAuth } from '../../context/AuthContext'
import PreviewDealModal from './PreviewDealModal'
import { FormProvider, useForm } from 'react-hook-form'
import FormDealLink from './FormDealLink'
import FormImageUpload from './FormImageUpload'
import FormTitle from './FormTitle'
import FormDescription from './FormDescription'
import FormPriceDetails from './FormPriceDetails'
import FormFinalDetails from './FormFinalDetails'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import { submitDeal } from '../../api'

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
    const success = await submitDeal(formDetails, userData, user);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className='bg-slate-400 w-full h-full'>

      <Modal open={openDealPreview} onClose={() => setOpenDealPreview(false)}>
        <PreviewDealModal               
          title={formDetails.title || "Your Title"}
          price={formDetails.price || 100}
          lastBestPrice={formDetails.lastBestPrice || 200}
          description={formDetails.description || "Your wonderful description appears right here"} 
          shippingCost={formDetails.shippingCost || 2.99}
          images={formDetails.images}
          category={formDetails.category}
          link={formDetails.dealLink}
        />
      </Modal>

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
                type='button'
                onClick={() => setOpenDealPreview(true)} 
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