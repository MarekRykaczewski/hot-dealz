import React from 'react'
import Tooltip from './Tooltip';
import { useFormContext } from "react-hook-form";

function FormPriceDetails({ formDetails, handleInputChange, handleCheckChange}) {

    const { register, formState: { errors } } = useFormContext();

    // Decimal validation object
    const decimalValidation = {
      decimal: value => {
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Invalid decimal value";
      }
    };

    return (
    <div className='grid grid-cols-2 overflow-hidden items-center gap-2'>
                
        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="price">Price </label>
        <Tooltip text={"Tell us the price"} subtext={"This should be the total price after any discounts"}>
        <input 
            {...register("price", { 
              min: 0, 
              validate: {
                required: value => {
                  if (!(value >= 0)) return "This is required";
                },
                ...decimalValidation
              }
            })} 
            name='price' 
            value={formDetails.price} 
            onChange={handleInputChange} 
            step="0.01" // Specify step size to allow two decimal places
            className='border rounded-md p-1 focus:outline-orange-500 w-full' 
            type="number" 
        />
        <span className='text-sm text-red-500 mt-1'>{errors.price?.message}</span>
        </Tooltip>

        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="nextBestPrice">Next best price</label>
        <Tooltip text={"Tell us the price"} subtext={"This should be the total price before any discounts"}>
        <input 
          {...register("nextBestPrice", { 
            min: 0, 
            validate: {
              required: value => {
                if (!(value >= 0)) return "This is required";
              },
              ...decimalValidation
            }
          })} 
        name='nextBestPrice' 
        value={formDetails.nextBestPrice} 
        onChange={handleInputChange} 
        className='border rounded-md p-1 focus:outline-orange-500 w-full'
        step="0.01" // Specify step size to allow two decimal places
        type="number" 
        />
        <span className='text-sm text-red-500 mt-1'>{errors.nextBestPrice?.message}</span>
        </Tooltip>

        <label className='text-sm font-bold text-gray-500 mt-1' htmlFor="">Shipping cost</label>
        <div className='flex flex-col'>
          <input 
            {...register("shippingCost", { 
              min: 0, 
              validate: {
                required: value => {
                  if (!(value >= 0)) return "This is required";
                },
                ...decimalValidation
              }
            })} 
            name='shippingCost' 
            value={formDetails.freeShipping ? 0 : formDetails.shippingCost} 
            onChange={handleInputChange} 
            className='border rounded-md p-1 focus:outline-orange-500' 
            type="number"
            step="0.01" // Specify step size to allow two decimal places
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
        className='scale-150 overflow-hidden'
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