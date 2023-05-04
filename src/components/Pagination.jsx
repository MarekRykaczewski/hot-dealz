import React from 'react'

function Pagination({ dealsPerPage, totalDeals, paginate }) {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalDeals / dealsPerPage); i++) {
        pageNumbers.push(i)
    }
  return (
    <nav>
        <ul className='flex gap-3 items-center justify-center'>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button className='border h-8 w-8 rounded-xl hover:bg-slate-100 hover:text-orange-500 transition' onClick={() => paginate(number)}>{number}</button>                   
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination