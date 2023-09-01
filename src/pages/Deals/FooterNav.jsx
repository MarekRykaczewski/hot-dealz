import React, { useState } from 'react'
import { AiFillFacebook, AiFillYoutube, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function FooterNav({ dealsPerPage, totalDeals, paginate, currentPage }) {

  const [showFooter, setShowFooter] = useState(false)
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalDeals / dealsPerPage); i++) {
      pageNumbers.push(i)
  }

  return (
    <div className='sticky item mt-auto bottom-0 w-full flex flex-col bg-white border-t-2 border-gray-300'>
      <div className='flex text-lg font-semibold text-slate-600 items-center justify-between p-5'>
          <button className='hover:text-orange-500 transition' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> Go to top </button>
          <div>
            <nav>
            <ul className='flex gap-3 items-center justify-center'>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button className={`${number == currentPage && 'text-orange-500'} border h-8 w-8 rounded-xl hover:bg-slate-100 hover:text-orange-500 transition`} onClick={() => paginate(number)}>{number}</button>                   
                    </li>
                ))}
            </ul>
            </nav>
          </div>
          <button onClick={() => setShowFooter(!showFooter)}> {showFooter ? "Hide footer" : "Show footer"} </button>
      </div>      
      {showFooter && 
        <div className='flex flex-col items-center p-6 text-white bg-slate-700'> 
          <div className='mb-4'>
            <h1 className='text-xl font-bold'> 👋 Hey, welcome to the newest online shopping social media! </h1>
            <p> Join now to share your expertie, tips and advice </p>
          </div>
          <div className='flex flex-row font-bold justify-start gap-5'>
            <div>
              <Link to={'/about'}> About </Link>            
            </div>
            <div>           
              <button> Contact us </button>
            </div>
            <div className='border'>
            </div>
            <div>
              <span> Follow us </span>
              <div className='flex items-center justify-center gap-3'>
                <button>
                  <AiFillFacebook size={20} />
                </button>
                <button>
                  <AiFillYoutube size={20} />
                </button>
                <button>
                  <AiFillTwitterCircle size={20} />
                </button>
                <button>
                  <AiFillInstagram size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        }
    </div>

  )
}

export default FooterNav