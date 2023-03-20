import React from 'react'

function Tabs() {
  return (
    <div className='flex ml-auto mr-auto justify-center bg-slate-200 w-80 w-max-7xl rounded-lg gap-3 p-2'>
        <button className=' text-slate-500 font-bold p-2 hover:text-orange-500 transition'> Hot </button>
        <button className='text-slate-500 font-bold p-2 hover:text-orange-500 transition'> New </button>
        <button className='text-slate-500 font-bold p-2 hover:text-orange-500 transition'> Most Comments </button>
    </div>
  )
}

export default Tabs