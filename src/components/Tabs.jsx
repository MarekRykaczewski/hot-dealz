import React from 'react'
import { sortByNewest, sortByComments } from '../utils'

function Tabs({ deals, setDeals }) {
  return (
    <div className='bg-white w-full px-5 py-2 border-b-2 border-gray-300'>
        <div className='flex justify-start gap-3 max-w-[80em] ml-auto mr-auto'>
          <button className=' text-slate-600 text-lg font-bold p-2 hover:text-orange-500 transition'> Hot </button>
          <button onClick={() => sortByNewest(deals, setDeals)} className='text-slate-600 text-lg font-bold p-2 hover:text-orange-600 transition'> New </button>
          <button onClick={() => sortByComments(deals, setDeals)} className='text-slate-600 text-lg font-bold p-2 hover:text-orange-500 transition'> Most Comments </button>
        </div>
    </div>
  )
}

export default Tabs