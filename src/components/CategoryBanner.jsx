import React from 'react'
import { BsPlugin } from 'react-icons/bs'
import { ImPriceTag } from 'react-icons/im'
import { BiComment } from 'react-icons/bi'

function CategoryBanner() {
  return (
    <div className='flex flex-col w-full' >
        <div className='flex bg-slate-800 w-full h-[150px] px-3 justify-start items-center'>
            <div className='flex flex-row gap-5 p-3'>
                <div className='bg-slate-100 p-5 rounded-3xl'>
                    <BsPlugin fontSize={"4em"}/>
                </div>
                <div className='flex flex-col gap-1 justify-center'>
                <span className='text-slate-100 font-bold text-xl'> Electronics Deals & Offers </span>
                    <span className='flex text-slate-100 items-center gap-2'> <ImPriceTag/> 1111 Active Deals  </span>
                    <span className='flex text-slate-100 items-center gap-2'> <BiComment/> 22314 Comments </span>
                </div>
            </div>
        </div>
        <div className='bg-slate-300 w-full h-auto px-3 py-2'>
            <span className='text-xs text-gray-800'>
            From televisions and speakers to drones and powerbanks, electronics can add additional convenience and entertainment to life. However, electronic market is growing and changing rapidly and it can be hard to keep track of what's out there and what's right for you. hotukdeals electronics listings is here to help find best prices and compare different electronic products from different brands.
            </span>
        </div>
    </div>
  )
}

export default CategoryBanner