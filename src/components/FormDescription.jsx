import React from 'react'
import { useFormContext } from "react-hook-form";
import Tooltip from './Tooltip';

function FormDescription({ formDetails, handleInputChange, DESCRIPTION_CHARACTER_LIMIT}) {
   
    const { register } = useFormContext();
   
    return (
    <div>
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
            placeholder='Here you can describe the deal in your own words and explain to other users why it is a good deal!' 
        />
        </Tooltip>
    </div>
  )
}

export default FormDescription