import React, { useEffect, useRef } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function NavAccountMenu({ openNavAccountMenu, toggleNavAccountMenu, profileRef }) {

  useEffect(() => {    
    document.addEventListener("click", handleOutsideClick, true)
    return () => document.removeEventListener("click", handleOutsideClick, true)
  }, [openNavAccountMenu])

  const handleOutsideClick = (e) => {
    if(!profileRef.current.contains(e.target)) {
        toggleNavAccountMenu()
    }
  }

  const { logout, user, userData } = UserAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')

  }

  return (
  <div id="dropdownInformation" className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <div className="px-4 py-3 text-white bg-orange-500 rounded-t-lg">
        <div className='text-md'>{userData.username}</div>
        <div className="text-md truncate">{user && user.email}</div>
      </div>
      <ul className="py-2 text-md text-gray-700" aria-labelledby="dropdownInformationButton">
        <li>
          <Link onClick={() => toggleNavAccountMenu()} to='/settings/profile' className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
        </li>
      </ul>
      <ul className="py-2 text-md text-gray-700" aria-labelledby="dropdownInformationButton">
        <li>
          <Link onClick={() => toggleNavAccountMenu()} to='/saved/' className="block px-4 py-2 hover:bg-gray-100">My saved</Link>
        </li>
      </ul>
      <div className="py-2">
        <a onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sign out</a>
      </div>
  </div>
  )
}

export default NavAccountMenu