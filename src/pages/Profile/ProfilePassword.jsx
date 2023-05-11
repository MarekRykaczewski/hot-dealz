import React, { useState } from 'react'
import { updatePassword } from "firebase/auth";
import { auth } from '../../config/firebase'
import { useForm } from 'react-hook-form'

function ProfilePassword() {

    const { register, watch, handleSubmit, formState: { errors } } = useForm()
    const [editPassword, setEditPassword] = useState(false)
    const [newPassword, setNewPassword] = useState()
    const [newConfirmPassword, setNewConfirmPassowrd] = useState()

    const submitData = async () => {

        try {

          // Update password in Firebase Authentication
          await updatePassword(auth.currentUser, newPassword);

          // Clear input field
          setNewPassword('')

          // Hide editPassword
          setEditPassword(false)
        
          // Show success message to user
          alert('Password updated successfully!');

          // Refresh page
          location.reload()

        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className='flex flex-row justify-start mb-10'>
        <div className='flex flex-col mr-10 w-[200px]'>
            <span className='font-bold'> password </span>
        </div>
        <form onSubmit={handleSubmit(() => submitData())} className='flex flex-col gap-4 w-[300px]'>
            {!editPassword ? <span className='text-blue-700'> ... </span> : 
                <div className='flex flex-col gap-1'>
                    <input
                      {...register("password", {
                        required: true
                      })} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className='border p-1 rounded-lg' placeholder='New password' 
                      type="text" 
                    />
                    <input
                      {...register("confirm_password", {
                        required: true,
                        validate: (val) => {
                          if (watch('password') !== val) {
                            return "Your passwords do not match";
                          }
                        }
                      })}
                      onChange={(e) => setNewConfirmPassowrd(e.target.value)} 
                      className='border p-1 rounded-lg' 
                      placeholder='Confirm new password' 
                      type="text" 
                    />
                    <span className='text-sm text-red-500 mt-1'>{errors.confirm_password?.message}</span>
                </div>
                }
            <button type='button' onClick={() => setEditPassword(!editPassword)} className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> {editPassword ? 'Cancel' : 'Change Password'} </button>
            {editPassword && <button type='submit' className='self-center py-1 border rounded-2xl w-[250px] hover:bg-gray-100 hover:text-orange-500 transition'> Submit </button>}
        </form>
    </div>
  )
}

export default ProfilePassword