import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { useFormContext } from "react-hook-form";

function FormDealLink({ formDetails, handleInputChange }) {

    const { register } = useFormContext();

  return (
    <div>
        <div>        
        <div className='relative'>
            <h1 className='text-2xl font-bold mb-4'> Deal Link </h1>
            <AiOutlineLink className='absolute top-14 left-2 text-gray-400'/>
        </div>
        </div>

        <input 
        {...register("dealLink", { required: "This is required." })} 
        name='dealLink' 
        value={formDetails.dealLink} 
        onChange={handleInputChange} 
        className='border w-full rounded-md p-1 pl-7 focus:outline-orange-500' 
        type="text" 
        />
  </div>
  )
}

export default FormDealLink