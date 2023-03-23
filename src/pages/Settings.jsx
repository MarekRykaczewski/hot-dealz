import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Settings() {

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
      <div>
        <h1> Settings </h1>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Settings