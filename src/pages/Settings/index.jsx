import React from 'react'
import { Outlet } from 'react-router-dom'


function Settings() {

  return (
    <div className='flex flex-col md:flex-row h-screen max-w-full bg-slate-300'>
      <div className='md:w-[50%] h-full'>
      </div>
      <div className='bg-white w-full'>
        <div className='bg-white justify-self-end w-full md:w-fit pr-6 pl-6 pt-6'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Settings