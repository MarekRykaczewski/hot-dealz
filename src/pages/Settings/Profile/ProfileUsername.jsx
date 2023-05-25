import React, { useState } from 'react'
import { auth } from '../../../config/firebase'
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

import { UserAuth } from '../../../context/AuthContext'

function ProfileUsername() {

    const { user, userData } = UserAuth()
    const [editUsername, setEditUsername] = useState(false)
    const [newUsername, setNewUsername] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
    
          // Update user's username in Firestore
          await updateDoc(doc(db, "users", user.uid), {
            username: newUsername
          });
    
          // Clear input field
          setNewUsername('');

          // Hide editUsername
          setEditUsername(false)
    
          // Show success message to user
          alert('Username updated successfully!');

          // Refresh page
          location.reload()

        } catch (error) {
          console.error(error);
          alert('An error occurred while updating your username. Please try again later.');
        }
      };

  return (
    <div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> username </span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[300px]'>
                {!editUsername ? <span className='text-blue-700'> {userData.username} </span> : <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className='border p-1 rounded-lg' placeholder={userData.username} type="text" name="" id="" />}
                <button type='button' onClick={() => setEditUsername(!editUsername)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> {editUsername ? 'Cancel' : 'Change Username'} </button>
                {editUsername && <button type='submit' className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Submit </button>}
            </form>
        </div>
    </div>
  )
}

export default ProfileUsername