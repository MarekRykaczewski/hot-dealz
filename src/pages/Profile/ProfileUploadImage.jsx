import React, { useEffect, useRef, useState } from 'react'

function ProfileUploadImage({ profilePicture, setProfilePicture, handleImageUpload }) {

    const imgRef = useRef(null)
  
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (profilePicture) {
          setEditing(true);
        } else {
          setEditing(false);
        }
      }, [profilePicture]);

    return (
    <div className='flex flex-row justify-start mb-10'>
    <div className='flex flex-col mr-10 w-[200px]'>
        <span className='font-bold'> Your profile picture </span>
        <span> Optional </span>
    </div>
    <div className='flex flex-col gap-4 w-[300px]'>
        <img ref={imgRef} src={profilePicture ? URL.createObjectURL(profilePicture) : ''} className='self-center w-[200px] h-[200px] bg-slate-600'/>
        {!editing && 
        <div className='flex flex-col w-[300px]'>
            <label htmlFor="profilePic" className='text-center self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Upload </label>
            <input onChange={(e) => handleImageUpload(e)} className='hidden' id='profilePic' type='file' />
        </div>}
        {editing && <button onClick={() => setProfilePicture('')} className='text-center self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Cancel </button>}
        {editing && <button className='text-center self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Confirm </button>}
    </div>
</div>
  )
}

export default ProfileUploadImage