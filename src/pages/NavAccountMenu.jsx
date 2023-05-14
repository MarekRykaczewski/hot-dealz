import React, { useEffect, useRef } from 'react'
import { UserAuth } from '../context/AuthContext'
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
  <div id="dropdownInformation" className="z-10 absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <div className="px-4 py-3 text-white bg-orange-500 rounded-t-lg">
        <div className='text-md'>{userData.username}</div>
        <div className="text-md truncate">{user && user.email}</div>
      </div>
      <ul className="py-2 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Place 1</a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Place 2</a>
        </li>
        <li>
          <Link onClick={() => toggleNavAccountMenu()} to='/settings/profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
        </li>
      </ul>
      <div className="py-2">
        <a onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
      </div>
  </div>
  )
}

export default NavAccountMenu