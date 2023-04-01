import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiFillFire } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import NavAccountMenu from './NavAccountMenu'

function Nav({toggleSignInModal, openNavAccountMenu, toggleNavAccountMenu}) {

  const { user } = UserAuth()

  return (
    <nav className='flex items-center justify-between bg-slate-700 p-6'>
        <Link to='/' className="flex items-center flex-shrink-0 text-white mr-6 gap-1">
            <AiFillFire fontSize='2em' color='orange'/>
            <span className="font-semibold text-xl tracking-tight">Hot Dealz</span>
        </Link>
        <div className="flex items-center justify-between w-full flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            <a className="block lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
                Place1
            </a>
            <a className="block lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4">
                Place2
            </a>
            <a className="block lg:inline-block lg:mt-0 text-slate-200 hover:text-white">
                Place3
            </a>
            </div>
            <div className='flex gap-2'>
                <div className='relative'>
                    <BiUserCircle onClick={user ? toggleNavAccountMenu : toggleSignInModal} className=' cursor-pointer' color='white' fontSize='2.5em' /> 
                    {openNavAccountMenu && <NavAccountMenu />}
                </div>
                
                <Link to='/submission'>
                    <AiOutlinePlusCircle className=' cursor-pointer' color='white' fontSize='2.5em'/>  
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Nav