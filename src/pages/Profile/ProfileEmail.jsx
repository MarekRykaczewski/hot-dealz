import React, { useState } from 'react'
import { auth } from '../../config/firebase'
import { updateEmail } from 'firebase/auth'

import { UserAuth } from '../../context/AuthContext'

function ProfileEmail() {

    const { user } = UserAuth()
    const [editEmail, setEditEmail] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

          // Update email in Firebase Authentication
          await updateEmail(auth.currentUser, newEmail);

          // Clear input field
          setNewEmail('')

          // Hide editEmail
          setEditEmail(false)
        
          // Show success message to user
          alert('Email updated successfully!');

          // Refresh page
          location.reload()

        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className='flex flex-row justify-start mb-10'>
        <div className='flex flex-col mr-10 w-[200px]'>
            <span className='font-bold'> e-mail </span>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[300px]'>
            {!editEmail ? <span className='text-blue-700'> {user.email} </span> : <input onChange={(e) => setNewEmail(e.target.value)} className='border p-1 rounded-lg' placeholder={user.email} type="text" name="" id="" />}
            <button type='button' onClick={() => setEditEmail(!editEmail)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> {editEmail ? 'Cancel' : 'Change Email'} </button>
            {editEmail && <button type='submit' className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Submit </button>}
        </form>
    </div>
  )
}

export default ProfileEmail