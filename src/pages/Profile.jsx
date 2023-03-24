import React from 'react'

function Profile() {
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
                <span className='text-blue-700'> username </span>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Change username </button>
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> your bio </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <span className='text-blue-700'> ... </span>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Change bio </button>
            </div>
        </div>
        <div className='flex flex-row justify-start mb-10'>
            <div className='flex flex-col mr-10 w-[200px]'>
                <span className='font-bold'> e-mail </span>
            </div>
            <div className='flex flex-col gap-4 w-[300px]'>
                <span className='text-blue-700'> email here </span>
                <button className='self-center py-1 border rounded-2xl w-[250px]'> Change email </button>
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