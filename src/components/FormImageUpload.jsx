import React from 'react'
import ImagesUpload from '../components/ImagesUpload'

function FormImageUpload({ formDetails, setFormDetails, TITLE_CHARACTER_LIMIT }) {
  return (
    <div>
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
    </div>
  )
}

export default FormImageUpload