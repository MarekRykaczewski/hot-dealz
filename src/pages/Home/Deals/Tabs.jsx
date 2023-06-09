import React from 'react'
import { sortByNewest, sortByComments } from '../../../utils'

function Tabs({ deals, setDeals }) {
  return (
    <div className='flex ml-auto mr-auto justify-start bg-white w-full gap-3 px-5 py-2 border-b-2 border-gray-300'>
        <button className=' text-slate-600 text-lg font-bold p-2 hover:text-orange-500 transition'> Hot </button>
        <button onClick={() => sortByNewest(deals, setDeals)} className='text-slate-600 text-lg font-bold p-2 hover:text-orange-600 transition'> New </button>
        <button onClick={() => sortByComments(deals, setDeals)} className='text-slate-600 text-lg font-bold p-2 hover:text-orange-500 transition'> Most Comments </button>
    </div>
  )
}

export default Tabs