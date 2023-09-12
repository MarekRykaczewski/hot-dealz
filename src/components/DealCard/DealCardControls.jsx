import React from 'react'
import { BsHourglassBottom, BsPencil } from 'react-icons/bs'

const DealCardControls = ({ isArchived, handleArchiveClick }) => {

  return (
    <div className='p-6 flex justify-between w-full max-w-3xl bg-white rounded-lg mt-3'>
      <div className='flex gap-3 items-center'>
        <h1 className='text-xl font-bold'> Status </h1>
        <span className={`${!isArchived ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-3 rounded-full transition-all duration-300`}> {!isArchived ? "Active" : "Inactive"} </span>
      </div>
      <div className='flex gap-3 items-center'>
        <button className='flex items-center gap-2 text-slate-800 hover:text-orange-600 transition-colors duration-300'> <BsPencil size={"1.2em"} /> Edit  </button>
        <button onClick={() => handleArchiveClick()} className='flex items-center gap-2 text-slate-800 hover:text-orange-600 transition-colors duration-300'> <span className='rotate'> <BsHourglassBottom size={"1.2em"} /> </span> {!isArchived ? "Archive" : "Renew"} </button>
      </div>
    </div>
  )
}

export default DealCardControls