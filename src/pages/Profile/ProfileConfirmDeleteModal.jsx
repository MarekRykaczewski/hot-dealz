import React, { useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { UserAuth } from '../../context/AuthContext'

function ProfileConfirmDeleteModal({ setDeleteAccountModal }) {

    const { user, userData } = UserAuth()

    const [confirmationInput, setConfirmationInput] = useState('')

    const handleChanges = (e) => {
        setConfirmationInput(e.target.value)
    }

  return (
    <div id="authentication-modal" aria-hidden="true" className="fixed w-full h-full bg-black bg-opacity-30 flex overflow-x-hidden overflow-y-auto top-0 left-0 right-0 z-50 justify-center items-center">
        <div className='bg-white rounded-lg overflow-auto flex flex-col bg-origin-content'>
            <div className='bg-red-100 w-full h-full p-6'>
                <div className='flex items-center gap-3 mb-4'>
                    <AiFillWarning className='text-red-700' size={28}/>
                    <h1 className='text-red-700 text-xl font-bold'>Delete your account?</h1>
                </div>
                <span className='text-red-700 font-medium text-md'>Doing so will permanently delete this account</span>
            </div>
            <div className='flex flex-col p-6'>
                <span className='mb-4'>Confirm you want to delete this acccount by typing the username</span>
                <input onChange={(e) => handleChanges(e)} className='border self-start p-1 w-80 mb-4' type="text" placeholder={userData.username} />
                <div className='self-center w-full flex justify-between'>
                    <button onClick={() => setDeleteAccountModal(false)} className='py-1 border rounded-2xl w-[250px] hover:bg-gray-100'>Cancel</button>
                    <button disabled={confirmationInput === userData.username ? true : false} className={`${confirmationInput !== userData.username ? 'bg-gray-300 hover:bg-gray-300 text-gray-500' : 'text-red-700 border border-red-700'} py-1  rounded-2xl w-[250px] hover:bg-red-100`}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileConfirmDeleteModal