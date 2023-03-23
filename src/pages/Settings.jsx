import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TbPlaceholder } from 'react-icons/tb'

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
    <div className='flex flex-row h-screen bg-slate-300 gap-3'>
      <div className='p-8 w-[450px]'>
        <h1 className='text-2xl mb-5 font-bold'> Settings </h1>
        <div className='flex flex-col gap-3'>
          <Link className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
            <TbPlaceholder fontSize='1.2em'/>
            <span> Profile </span>
          </Link>
          <Link className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
            <TbPlaceholder fontSize='1.2em'/>
            <span> Prefrences </span>
          </Link>
          <Link className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
            <TbPlaceholder fontSize='1.2em'/>
            <span> Connect </span>
          </Link>
          <Link className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
            <TbPlaceholder fontSize='1.2em'/>
            <span> Notifications </span>
          </Link>
          <Link className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
            <TbPlaceholder fontSize='1.2em'/>
            <span> Subscriptions </span>
          </Link>
        </div>
      </div>
      <div className='bg-white w-full'>
      </div>
    </div>
  )
}

export default Settings