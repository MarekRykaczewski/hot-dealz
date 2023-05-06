import React from 'react'

import { FiThumbsUp } from 'react-icons/fi'

function Comment() {
  return (
    <div className='border border-gray-400 border-t-1 border-b-0 border-l-0 border-r-0 w-full'>
        <div className='flex flex-col p-6'>
            <div className='flex mb-3 justify-between'>
                <div className='flex'>
                    <img className="self-start w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                    <div className='flex flex-col'>
                        <span>Username</span>
                        <span>Time</span>
                    </div>
                </div>
                <div>
                    <div className='hover:text-orange-500 transition flex flex-row-reverse gap-2 items-center '>
                        <span> Like</span>
                        <FiThumbsUp />
                    </div>
                </div>
            </div>
            <div>
                Comment Contents
            </div>
        </div>
    </div>
  )
}

export default Comment