import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Account() {

  const { user, logout } = UserAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log("You are logged out")
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='flex flex-col h-screen bg-slate-300 p-6 gap-3'>
        <h1> Welcome </h1>
        <p>User email: {user && user.email}</p>
        <button className='bg-orange-500 border border-black w-24 h-8' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Account