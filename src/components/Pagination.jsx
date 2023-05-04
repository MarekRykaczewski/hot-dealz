import React from 'react'

function Pagination({ dealsPerPage, totalDeals, paginate }) {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalDeals / dealsPerPage); i++) {
        pageNumbers.push(i)
    }
  return (
    <nav className='absolute bottom-0'>
        <ul>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button onClick={() => paginate(number)}>{number}</button>                   
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination