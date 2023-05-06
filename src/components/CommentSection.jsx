import React from 'react'

import Comment from './Comment'

function CommentSection() {
  return (
    <div className='flex flex-col w-full max-w-3xl bg-white mt-2 rounded-lg overflow-hidden'>
        <div className='flex flex-col gap-4 p-6'>
            <div className='flex start gap-3'>
                <span className='text-xl'>3 Comments</span>
                <span className='text-xl'>Sorting: Newest first</span>
            </div>
            <div className='flex items-center gap-3'>
                <img className="self-start w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                <textarea maxLength='350' className='p-4 resize-none w-full h-48 border border-gray-300 rounded-md' type="textarea" placeholder='What do you think?' name="comment" />
                <button className='transition border hover:text-orange-500 hover:bg-gray-100 rounded-3xl px-5 py-2'> Submit </button>
            </div>
        </div>
        <Comment />
        <Comment />
        <Comment />
    </div>
  )
}

export default CommentSection