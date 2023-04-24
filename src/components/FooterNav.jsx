import React from 'react'

import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'

function FooterNav() {
  return (
    <div className='flex text-lg font-semibold text-slate-600 items-center justify-between p-5 bg-white border-t-2 border-gray-300 fixed bottom-0 w-full'>
        <span> Go to top </span>
        <div className='flex justify-between items-center w-40'>
            <span> 1 ... </span>
            <AiFillCaretLeft /> 
            <span> Page 1 </span>
            <AiFillCaretRight />
            <span> ... 5 </span>
        </div>
        <span> Show footer</span>
    </div>
  )
}

export default FooterNav