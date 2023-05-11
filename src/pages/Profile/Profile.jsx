import React, { useState } from 'react'
import ProfileUsername from './ProfileUsername'

import { UserAuth } from '../../context/AuthContext'
import ProfileEmail from './ProfileEmail'
import ProfilePassword from './ProfilePassword'

function Profile() {

    const { user, userData } = UserAuth()

    const [profilePicture, setProfilePicture] = useState('')
    
    const handleImageUpload = (e) => {
        setProfilePicture(e.target.files[0])
    }

  return (
    <div className='flex flex-col'>
        <span className='text-2xl mb-6'> Profile </span>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> Your profile picture </span>
                <span> Optional </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <img src={profilePicture ? URL.createObjectURL(profilePicture) : ''} className='self-center w-[200px] h-[200px] bg-slate-600'/>
                <label htmlFor="profilePic" className='text-center self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Upload </label>
                <input onChange={(e) => handleImageUpload(e)} className='hidden' id='profilePic' type='file' />
            </div>
        </div>
        <ProfileUsername />
        <ProfileEmail />
        <ProfilePassword />
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