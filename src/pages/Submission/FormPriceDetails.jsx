import React from 'react'
import Tooltip from './Tooltip';
import { useFormContext } from "react-hook-form";

function FormPriceDetails({ formDetails, handleInputChange, handleCheckChange}) {

    const { register, formState: { errors } } = useFormContext();

    return (
    <div className='grid grid-cols-2 items-center gap-2'>
                
        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="price">Price </label>
        <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
        <input 
            {...register("price", { required: "This is required." })} 
            name='price' 
            value={formDetails.price} 
            onChange={handleInputChange} 
            className='border rounded-md p-1 focus:outline-orange-500 w-full' 
            type="text" 
        />
        <span className='text-sm text-red-500 mt-1'>{errors.price?.message}</span>
        </Tooltip>

        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="nextBestPrice">Next best price</label>
        <Tooltip text={"Tell us the price"} subtext={"This should be the total price before any discounts"}>
        <input 
        {...register("nextBestPrice", { required: "This is required." })} 
        name='nextBestPrice' 
        value={formDetails.nextBestPrice} 
        onChange={handleInputChange} 
        className='border rounded-md p-1 focus:outline-orange-500 w-full'
        type="text" 
        />
        <span className='text-sm text-red-500 mt-1'>{errors.nextBestPrice?.message}</span>
        </Tooltip>

        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Shipping cost</label>
        <div className='flex flex-col'>
            <input 
            {...register("shippingCost", { min: 0, required: "This is required." })} 
            name='shippingCost' 
            value={formDetails.freeShipping ? 0 : formDetails.shippingCost} 
            onChange={handleInputChange} 
            className='border rounded-md p-1 focus:outline-orange-500' 
            type="number"
            min={0}
            disabled={formDetails.freeShipping ? true : false}
            />
            <span className='text-sm text-red-500 mt-1'>{errors.shippingCost?.message}</span>
        </div>


        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Free shipping?</label>
        <input 
        {...register("freeShipping")} 
        onChange={(e) => handleCheckChange(e)} 
        type="checkbox" 
        className='scale-150'
        />

        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Voucher Code </label>
        <input
        {...register("voucherCode")} 
        name='voucherCode' 
        value={formDetails.voucherCode} 
        onChange={handleInputChange} 
        className='border rounded-md p-1 focus:outline-orange-500 mb-3' 
        type="text" />

  </div>
  )
}

export default FormPriceDetails