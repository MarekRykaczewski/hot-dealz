import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiFillFire } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

function Nav() {
  return (
    <nav className=' flex items-center justify-between flex-wrap bg-slate-700 p-6'>
        <div className="flex items-center flex-shrink-0 text-white mr-6 gap-1">
            <AiFillFire fontSize='2em' color='orange'/>
            <span className="font-semibold text-xl tracking-tight">Hot Dealz</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
                Place1
            </a>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
                Place2
            </a>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white">
                Place3
            </a>
            </div>
            <div className='flex gap-2'>
                <BiUserCircle className=' cursor-pointer' color='white' fontSize='2em' />
                <AiOutlinePlusCircle className=' cursor-pointer' color='white' fontSize='2em'/>
            </div>
        </div>
    </nav>
  )
}

export default Nav