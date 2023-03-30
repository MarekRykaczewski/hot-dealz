import React from 'react'

import { AiOutlineLink } from 'react-icons/ai'

function Submission() {
  return (
    <div className='bg-slate-400 w-full h-full'>
        <div className='flex flex-col p-5 bg-white ml-auto mr-auto w-[700px]'>
            
            <h1 className='text-2xl font-bold'> Add a new deal </h1>
            <hr className='mb-4 mt-4'></hr>
            
            <div className='relative'>
              <h1 className='text-2xl font-bold mb-4'> Deal Link </h1>
              <AiOutlineLink className='absolute top-14 left-2 text-gray-400'/>
            </div>
            <input className='border rounded-md p-1 pl-7 focus:outline-orange-500' type="text" />
            
            <hr className='mb-4 mt-4'></hr>
            
            <h1 className='text-2xl font-bold mb-4'> The essentials </h1>
            
            <h3 className='text-sm font-bold text-gray-500 mb-2'> Gallery </h3>
            <div className='flex p-3 border-2 border-dashed rounded-md w-full h-[200px] mb-4'>
              <div className='w-full'>
                <span> Make your deal stand out with images </span>
                <p className='text-xs text-gray-500'> Upload up to 3 images to publish your deal.</p>
              </div>
              <div className='flex justify-center items-center relative w-full'>
                <button className='absolute bg-orange-500 hover:bg-orange-400 transition-all text-white py-2 px-5 rounded-3xl'>
                   Upload Images 
                </button>
                <div className='flex gap-3'>
                  <div className='bg-slate-300 w-[100px] h-[100px] rounded-xl'></div>
                  <div className='bg-slate-300 w-[100px] h-[100px] rounded-xl'></div>
                  <div className='bg-slate-300 w-[100px] h-[100px] rounded-xl'></div>
                </div>
              </div>
            </div>  
            
            <div className='flex justify-between items-center'>
              <h3 className='text-sm font-bold text-gray-500 mb-2'> Title </h3>
              <span className='text-xs text-gray-500'> Characters remaining 123 </span>
            </div>
            <input className='border rounded-md p-1 focus:outline-orange-500 mb-3' type="text" />
           
            <h3 className='text-sm font-bold text-gray-500 mb-2'> Description </h3>
            <textarea className='resize-none border rounded-md p-3 focus:outline-orange-500 w-full h-[300px]' type="text" placeholder='Here you can describe the deal in your own words and explain to other users why it is a good deal!' />
            
            <hr className='mb-4 mt-4'></hr>

            <h3 className='text-2xl font-bold mb-4'> Price details </h3>
            
            <div className='flex flex-col gap-3 items-center justify-start'>
              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col '>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="price">Price </label>
                  <input name='price' className='border rounded-md p-1 focus:outline-orange-500' type="text" />
                </div>
              
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="nb-price">Next best price</label>
                  <input name='nb-price' className='border rounded-md p-1 focus:outline-orange-500' type="text" />
                </div>
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Shipping cost</label>
                  <input className='border rounded-md p-1 focus:outline-orange-500' type="text" />
                </div>

                <div className='flex flex-row-reverse gap-2 items-center mt-7'>
                  <label className='text-sm font-bold text-gray-500' htmlFor="">Free shipping?</label>
                  <input type="checkbox" />
                </div>
              </div>

              <div className='flex w-full justify-start items-center gap-4'>
                <div className='flex flex-col'>
                  <label className='text-sm font-bold text-gray-500 mb-2' htmlFor="">Voucher Code </label>
                  <input className='border rounded-md p-1 focus:outline-orange-500' type="text" />
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
              <input className='border rounded-md p-1 focus:outline-orange-500' type="date" placeholder='DD/MM/YYYY' />
              <label className='text-sm font-bold text-gray-500' htmlFor=""> End Date </label>
              <input className='border rounded-md p-1 focus:outline-orange-500' type="date" placeholder='DD/MM/YYYY' />
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