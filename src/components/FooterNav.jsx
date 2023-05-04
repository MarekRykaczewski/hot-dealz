import React from 'react'
import Pagination from './Pagination'

import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

function FooterNav({ dealsPerPage, totalDeals, paginate }) {

  console.log(dealsPerPage, totalDeals, paginate)

  return (
    <div className='flex text-lg font-semibold text-slate-600 items-center justify-between p-5 bg-white border-t-2 border-gray-300 fixed bottom-0 w-full'>
        <span> Go to top </span>
        <div>
          <Pagination dealsPerPage={dealsPerPage} totalDeals={totalDeals} paginate={paginate}/>
        </div>
        <span> Show footer</span>
    </div>
  )
}

export default FooterNav