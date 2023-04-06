import React, { useRef, useState } from 'react'

import { AiOutlineLink } from 'react-icons/ai'
import ImagesUpload from '../components/ImagesUpload'
import Tooltip from '../components/Tooltip'

function Submission() {

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
    categories: [], // Todo
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

  return (
    <div className='bg-slate-400 w-full h-full'>
        <div className='flex flex-col p-5 bg-white ml-auto mr-auto w-[700px]'>
            
            <h1 className='text-2xl font-bold'> Add a new deal </h1>
            <hr className='mb-4 mt-4'></hr>
            
            <div className='relative'>
              <h1 className='text-2xl font-bold mb-4'> Deal Link </h1>
              <AiOutlineLink className='absolute top-14 left-2 text-gray-400'/>
            </div>
            <input name='dealLink' value={formDetails.dealLink} onChange={handleInputChange} className='border rounded-md p-1 pl-7 focus:outline-orange-500' type="text" />
            
            <hr className='mb-4 mt-4'></hr>
            
            <h1 className='text-2xl font-bold mb-4'> The essentials </h1>
            
            <h3 className='text-sm font-bold text-gray-500 mb-2'> Gallery </h3>
            <div className='flex p-3 border-2 border-dashed rounded-md w-full h-[200px] mb-4'>
              <div className='w-full'>
                <span> Make your deal stand out with images </span>
                <p className='text-xs text-gray-500'> Upload up to 3 images to publish your deal.</p>
              </div>
              <ImagesUpload size={3} formDetails={formDetails} setFormDetails={setFormDetails}/>
            </div>  
            
            <div className='flex justify-between items-center'>
              <h3 className='text-sm font-bold text-gray-500 mb-2'> Title </h3>
              <span className='text-xs text-gray-500'> {TITLE_CHARACTER_LIMIT - formDetails.title.length} Characters remaining </span>
            </div>
            <Tooltip text={"Make your title stand out"} subtext={"Include the Brand, Product type, Color, and Model in your title (e.g. Nike Airforce 1 White)"}> 
            <input name='title' value={formDetails.title} onChange={handleInputChange} maxLength={TITLE_CHARACTER_LIMIT} className='border rounded-md p-1 focus:outline-orange-500 mb-3 w-full' type="text" />
            </Tooltip>

            <div className='flex justify-between items-center'>
              <h3 className='text-sm font-bold text-gray-500 mb-2'> Description </h3>
              <span className='text-xs text-gray-500'> {DESCRIPTION_CHARACTER_LIMIT - formDetails.description.length} Characters remaining </span>
            </div>
            <Tooltip text={"Tell us about your deal"} subtext={"Include details about the product, links to any relevant info/reviews, and why you think it's a deal worth sharing"}>
            <textarea name='description' value={formDetails.description} onChange={handleInputChange} maxLength={DESCRIPTION_CHARACTER_LIMIT} className='resize-none border rounded-md p-3 focus:outline-orange-500 w-full h-[300px]' type="text" placeholder='Here you can describe the deal in your own words and explain to other users why it is a good deal!' />
            </Tooltip>
            
            <hr className='mb-4 mt-4'></hr>

            <h3 className='text-2xl font-bold mb-4'> Price details </h3>
            
            <div className='flex flex-col gap-3 items-center justify-start'>
              <div className='flex w-full justify-start items-center gap-4'>
                <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
                  <div className='flex flex-col w-max '>
                    <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="price">Price </label>
                    <input name='price' value={formDetails.price} onChange={handleInputChange} className='border rounded-md p-1 focus:outline-orange-500 mb-3' type="text" />
                  </div>
                </Tooltip>
              
                <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
                <div className='flex flex-col w-max'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="nextBestPrice">Next best price</label>
                  <input name='nextBestPrice' value={formDetails.nextBestPrice} onChange={handleInputChange} className='border rounded-md p-1 focus:outline-orange-500 mb-3' type="text" />
                </div>
                </Tooltip> 
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Shipping cost</label>
                  <input name='shippingCost' value={formDetails.shippingCost} onChange={handleInputChange}  className='border rounded-md p-1 focus:outline-orange-500 mb-3' type="text" />
                </div>

                <div className='flex flex-row-reverse gap-2 items-center mt-7 mb-3'>
                  <label className='text-sm font-bold text-gray-500' htmlFor="">Free shipping?</label>
                  <input onChange={(e) => handleCheckChange(e)} type="checkbox" />
                </div>
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Voucher Code </label>
                  <input name='voucherCode' value={formDetails.voucherCode} onChange={handleInputChange} className='border rounded-md p-1 focus:outline-orange-500 mb-3' type="text" />
                  </div>
              </div>
            </div>

            <hr className='mb-4 mt-4'></hr>
            
            <h3 className='text-2xl font-bold mb-4'> Final details </h3>
            
            <span className='text-sm font-bold text-gray-500' >Categories</span>
            <span className='text-xs text-gray-500 mb-3'> Which of these categories best describes your deal?</span>
            
            <div className='flex mb-3 gap-3'>
              <button className='border rounded-xl py-1 px-5'> Gaming </button>
              <button className='border rounded-xl py-1 px-5'> Gaming </button>
              <button className='border rounded-xl py-1 px-5'> Gaming </button>
              <button className='border rounded-xl py-1 px-5'> Gaming </button>
            </div>

            <div className='flex flex-col items-start gap-3'>
              <label className='text-sm font-bold text-gray-500' htmlFor=""> Start Date </label>
              <input name='startDate' value={formDetails.startDate} onChange={handleInputChange} className='border rounded-md p-1 focus:outline-orange-500' type="date" placeholder='DD/MM/YYYY' />
              <label className='text-sm font-bold text-gray-500' htmlFor=""> End Date </label>
              <input name='endDate' value={formDetails.endDate} onChange={handleInputChange} className='border rounded-md p-1 focus:outline-orange-500' type="date" placeholder='DD/MM/YYYY' />
            </div>

            <div className='flex gap-3 items-center justify-end w-ful'>
              <button className='bg-white hover:bg-gray-200 border transition-all text-gray-500 py-2 px-5 rounded-3xl'> Preview </button>
              <button className='bg-orange-500 hover:bg-orange-400 transition-all text-white py-2 px-5 rounded-3xl'> Publish </button>
            </div>

        </div>
    </div>
  )
}

export default Submission