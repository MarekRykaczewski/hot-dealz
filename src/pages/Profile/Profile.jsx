import React, { useState } from 'react'
import ProfileUsername from './ProfileUsername'

import { UserAuth } from '../../context/AuthContext'
import ProfileEmail from './ProfileEmail'
import ProfilePassword from './ProfilePassword'
import ProfileConfirmDeleteModal from './ProfileConfirmDeleteModal'
import ProfileUploadImage from './ProfileUploadImage'

function Profile() {

    const { user, userData } = UserAuth()

    const [profilePicture, setProfilePicture] = useState('')
    const [deleteAccountModal, setDeleteAccountModal] = useState(false)

    const handleImageUpload = (e) => {
        setProfilePicture(e.target.files[0])
    }

  return (
    <div className='flex flex-col'>
        {deleteAccountModal && <ProfileConfirmDeleteModal setDeleteAccountModal={setDeleteAccountModal} />}
        <span className='text-2xl mb-6'> Profile </span>
        <ProfileUploadImage 
            profilePicture={profilePicture} 
            setProfilePicture={setProfilePicture}
            handleImageUpload={handleImageUpload}
        />
        <ProfileUsername />
        <ProfileEmail />
        <ProfilePassword />
        <hr className='mb-10'></hr>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> delete account </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <button onClick={() => setDeleteAccountModal(true)}  className='self-center py-1 text-red-700 border border-red-700 rounded-2xl w-[250px]'> Delete account </button>
            </div>
        </div>
    </div>
  )
}

export default Profile