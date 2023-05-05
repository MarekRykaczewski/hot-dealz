import React from 'react'
import Pagination from './Pagination'

import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

function FooterNav({ dealsPerPage, totalDeals, paginate }) {

  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalDeals / dealsPerPage); i++) {
      pageNumbers.push(i)
  }

  return (
    <div className='flex text-lg font-semibold text-slate-600 items-center justify-between p-5 bg-white border-t-2 border-gray-300 fixed bottom-0 w-full'>
        <button className='hover:text-orange-500 transition' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> Go to top </button>
        <div>
          <nav>
          <ul className='flex gap-3 items-center justify-center'>
              {pageNumbers.map(number => (
                  <li key={number}>
                      <button className='border h-8 w-8 rounded-xl hover:bg-slate-100 hover:text-orange-500 transition' onClick={() => paginate(number)}>{number}</button>                   
                  </li>
              ))}
          </ul>
          </nav>
        </div>
        <span> Show footer</span>
    </div>
  )
}

export default FooterNav