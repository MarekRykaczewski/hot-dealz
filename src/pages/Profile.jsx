import React, { useState } from 'react'

import { UserAuth } from '../context/AuthContext'

function Profile() {

    const { user, userData } = UserAuth()

    const [editUsername, setEditUsername] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    
  return (
    <div className='flex flex-col'>
        <span className='text-2xl mb-6'> Profile </span>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> Your profile picture </span>
                <span> Optional </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <div className='self-center w-[200px] h-[200px] bg-slate-600'> Placeholder (image) </div>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Add image </button>
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> username </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <span className='text-blue-700'> {userData.username} </span>
                <button onClick={() => setEditUsername(!editUsername)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> {editUsername ? 'Cancel' : 'Change Username'} </button>
                {editUsername && <input className='border p-1 rounded-lg' placeholder={userData.username} type="text" name="" id="" />}
                {editUsername && <button onClick={() => setEditUsername(false)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Submit </button>}
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> e-mail </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <span className='text-blue-700'> {user.email} </span>
                <button onClick={() => setEditEmail(!editEmail)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Change email </button>
                {editEmail && <input className='border p-1 rounded-lg' placeholder={user.email} type="text" name="" id="" />}
                {editEmail && <button onClick={() => setEditEmail(false)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Submit </button>}
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> password </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <span className='text-blue-700'> ... </span>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Change password </button>
            </div>
        </div>
        <hr className='mb-10'></hr>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> account data </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Download data </button>
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> delete account </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <button className='self-center py-1 text-red-700 border border-red-700 rounded-2xl w-[250px]'> Delete account </button>
            </div>
        </div>
    </div>
  )
}

export default Profile