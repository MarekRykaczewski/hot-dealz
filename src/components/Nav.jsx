import React, { useEffect, useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiFillFire } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Nav({toggleSignInModal, openNavAccountMenu, toggleNavAccountMenu}) {

    useEffect(() => {    
        document.addEventListener("click", handleOutsideClick, true)
        return () => document.removeEventListener("click", handleOutsideClick, true)
        }, [openNavAccountMenu])

    const { logout, user, userData } = UserAuth()
    const navigate = useNavigate()
    const docRef = useRef(null)
    const profileRef = useRef(null)
    
    const handleOutsideClick = (e) => {
    if(docRef.current.contains(e.target)) {
        return
    } else {
        toggleNavAccountMenu()
    }
    }
    
    const handleLogout = () => {
    logout()
    navigate('/')
    }

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
                    <BiUserCircle ref={profileRef} onClick={user ? toggleNavAccountMenu : toggleSignInModal} className=' cursor-pointer' color='white' fontSize='2.5em' /> 
                    {openNavAccountMenu && 
                     <div ref={docRef} id="dropdownInformation" className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                     <div className="px-4 py-3 text-sm text-white bg-orange-500 rounded-t-lg">
                       <div>{userData.username}</div>
                       <div className="font-medium truncate">{user && user.email}</div>
                     </div>
                     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                       <li>
                         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Place 1</a>
                       </li>
                       <li>
                         <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Place 2</a>
                       </li>
                       <li>
                         <Link to='/settings/profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                       </li>
                     </ul>
                     <div className="py-2">
                       <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                     </div>
                 </div>}
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