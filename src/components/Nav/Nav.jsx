import React, { useRef, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiFillFire } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import NavAccountMenu from './NavAccountMenu'
import NavSearchBar from './NavSearchBar'
import AuthModal from '../Auth/AuthModal'

function Nav({openNavAccountMenu, toggleNavAccountMenu}) {

	const [openAuthModal, setOpenAuthModal] = useState(false)

  const { user } = UserAuth()

  const profileRef = useRef(null)

  return (
		<>
    <nav className='relative h-[60px] flex sm:flex-row flex-row sm:items-center gap-3 items-center justify-between bg-slate-700 px-6 py-3'>
        <div className='flex flex-row flex-wrap gap-3 items-center justify-between w-full'>
            <Link to='/' className="flex items-center flex-shrink-0 text-white gap-1">
                <AiFillFire fontSize='2.5em' color='orange'/>
                <span className="font-semibold text-2xl tracking-tight">Hot Dealz</span>
            </Link>
            <NavSearchBar />
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
            <div ref={profileRef} className='relative flex items-center justify-center rounded-full bg-slate-500 transition-all text-white hover:bg-slate-400 duration-500 h-12 w-12'>
                <BiUserCircle size={35} onClick={user ? toggleNavAccountMenu : () => setOpenAuthModal(true)} className='cursor-pointer'/> 
                {openNavAccountMenu && <NavAccountMenu profileRef={profileRef} openNavAccountMenu={openNavAccountMenu} toggleNavAccountMenu={toggleNavAccountMenu} />}
            </div>
            
            <div className='flex items-center justify-center rounded-full bg-slate-500 transition-all hover:bg-slate-400 duration-500 h-12 w-12 text-white'>
                <Link to='/submission'>
                    <AiOutlinePlusCircle size={35} className='cursor-pointer'/>  
                </Link>
            </div>
        </div>
    </nav>
		<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
		</>
  )
}

export default Nav