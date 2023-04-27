import React from 'react'
import Tooltip from './Tooltip';
import { useFormContext } from "react-hook-form";

function FormPriceDetails({ formDetails, handleInputChange, handleCheckChange}) {

    const { register } = useFormContext();

    return (
    <div className='flex flex-col items-center justify-start'>
        <div className='flex lg:flex-row lg:gap-8 flex-wrap gap-0 w-full justify-start items-center'>
            <div className='flex flex-col w-max gap-1'>
                <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="price">Price </label>
                <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
                <input 
                    {...register("price", { required: "This is required." })} 
                    name='price' 
                    value={formDetails.price} 
                    onChange={handleInputChange} 
                    className='border rounded-md p-1 focus:outline-orange-500' 
                    type="text" 
                />
                </Tooltip>
            </div>

        
        <Tooltip text={"What was the next best price?"} subtext={"This should be the total price before any discounts"}>
            <div className='flex flex-col w-max gap-1'>
                <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="nextBestPrice">Next best price</label>
                <input 
                {...register("nextBestPrice", { required: "This is required." })} 
                name='nextBestPrice' 
                value={formDetails.nextBestPrice} 
                onChange={handleInputChange} 
                className='border rounded-md p-1 focus:outline-orange-500'
                type="text" 
                />
            </div>
        </Tooltip> 
        </div>

        <div className='flex w-full justify-start items-center gap-4'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Shipping cost</label>
                <input 
                {...register("shippingCost", { required: "This is required." })} 
                name='shippingCost' 
                value={formDetails.shippingCost} 
                onChange={handleInputChange} 
                className='border rounded-md p-1 focus:outline-orange-500' 
                type="text" 
                />
                <div className='flex flex-row gap-2 justify-start items-center mt-1 mb-3'>
                    <label className='text-sm font-bold text-gray-500' htmlFor="">Free shipping?</label>
                    <input 
                    {...register("freeShipping", { required: "This is required." })} 
                    onChange={(e) => handleCheckChange(e)} 
                    type="checkbox" 
                    />
                </div>
            </div>


        </div>

        <div className='flex w-full justify-start items-center'>
        <div className='flex flex-col gap-1'>
            <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Voucher Code </label>
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
  )
}

export default FormPriceDetails