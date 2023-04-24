import React, { useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiFillFire } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import NavAccountMenu from './NavAccountMenu'

function Nav({toggleSignInModal, openNavAccountMenu, toggleNavAccountMenu}) {

  const { user } = UserAuth()

  const profileRef = useRef(null)

  return (
    <nav className='flex items-center justify-between bg-slate-700 p-6'>
        <Link to='/' className="flex items-center flex-shrink-0 text-white gap-1">
            <AiFillFire fontSize='2.5em' color='orange'/>
            <span className="font-semibold text-2xl tracking-tight">Hot Dealz</span>
        </Link>
        <div className="flex items-center justify-between w-full flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            </div>
            <div className='flex gap-2'>
                <div ref={profileRef} className='relative'>
                    <BiUserCircle onClick={user ? toggleNavAccountMenu : toggleSignInModal} className=' cursor-pointer' color='white' fontSize='2.5em' /> 
                    {openNavAccountMenu && <NavAccountMenu profileRef={profileRef} openNavAccountMenu={openNavAccountMenu} toggleNavAccountMenu={toggleNavAccountMenu} />}
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