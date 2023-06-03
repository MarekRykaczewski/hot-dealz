import React from 'react'
import { UserAuth } from '../../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
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
    <div className='flex flex-col md:flex-row h-screen max-w-full bg-slate-300 gap-3'>
      <div className='md:w-[50%] h-full'>
        <div className='p-8 w-full md:w-[350px] ml-auto'>
          <h1 className='text-2xl mb-5 font-bold'> Settings </h1>
          <div className='flex flex-col gap-3'>
            <Link to={'profile'} className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
              <TbPlaceholder fontSize='1.2em'/>
              <span> Profile </span>
            </Link>
            <Link to={'preferences'} className='flex items-center justify-start gap-5 text-[1.2em] bg-white rounded-3xl px-5 py-2 text-center'> 
              <TbPlaceholder fontSize='1.2em'/>
              <span> Preferences </span>
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
      </div>
      <div className='bg-white w-full'>
        <div className='bg-white justify-self-end w-fit pl-6 pt-6'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Settings