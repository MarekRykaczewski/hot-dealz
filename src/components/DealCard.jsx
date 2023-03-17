import React from 'react'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'

function DealCard() {
  return (
<div className="max-w-sm w-full lg:max-w-full lg:flex">
  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-slate-500" title="Woman holding a mug">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
      <div className="text-sm text-gray-600 flex items-center justify-between">
        <div className='flex justify-around items-center gap-2 rounded-l-full rounded-r-full border border-black w-32 h-8 p-2'>
          <button className='text-blue-500 font-bold text-2xl'>–</button>
          <span className='font-bold text-lg'> 345 </span>
          <button className='text-orange-500 font-bold text-2xl'>+</button>          
        </div>
        <div className='flex gap-1 items-center'>
          <AiOutlineClockCircle />
          <span> 1h, 40 min</span>
        </div>
      </div>
      <div className="text-gray-900 font-bold text-xl mb-2">Jean Paul Gaultier Le Beau / Ultra Male, woda toaletowa, 75 ml, edt, perfumy - zbiorcza</div>
      <p className="text-gray-700 text-base">Super ceny w Lyko na wiele zapachów zarówno męskich jak i damskich!! Sklep legitny, potwierdzony przez perfumehub: LINK Żeby uzyskać podane ceny trzeba się zarejestrować do klubu Lyko oraz wpisać kod vouch</p>
    </div>
    <div className="flex items-center justify-between gap-5">
      <div className='flex justify-center items-center'>
        <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Marek</p>
        </div>      
      </div>
      <div className='flex gap-5'>
        <button><BsBookmark /></button>
        <button className='flex items-center justify-center gap-1'><BiCommentDetail /> 175</button>
        <button className='flex items-center justify-center gap-1'>Go to deal<FiExternalLink /></button>
      </div>
    </div>
  </div>
</div>
  )
}

export default DealCard