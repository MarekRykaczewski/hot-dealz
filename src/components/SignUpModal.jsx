import React from 'react'

function SignUpModal({toggleSignInModal, toggleSignUpModal}) {
  return (
<div>
<div id="authentication-modal" aria-hidden="true" className="fixed w-full h-full bg-black bg-opacity-30 flex overflow-x-hidden overflow-y-auto md:h-full top-0 left-0 right-0 md:inset-0 z-50 justify-center items-center">
        <div className="flex max-[520px]:flex-col justify-center m-5 relative w-max max-w-max md:h-auto bg-white rounded-lg shadow">
            <div className='flex flex-col gap-3 rounded-tl-lg max-[520px]:rounded-bl-none max-[520px]:rounded-tr-lg rounded-bl-lg text-white items-center justify-center bg-slate-200 p-6'>
                <span className='text-gray-600 text-xl'> Welcome to Hot Dealz</span>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <a onClick={toggleSignInModal} className="text-orange-700 hover:underline dark:text-orange-500">Sign in</a>
                </div>
            </div>
            <div className='w-[300px] flex flex-col'>
                <div className="flex justify-end p-2">
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg onClick={toggleSignUpModal} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>
                <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to Hot Dealz</h3>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your username</label>
                        <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required=""/>
                    </div>
                    <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Sign up</button>
                </form>
            </div>
        </div>
    </div> 
</div>
  )
}

export default SignUpModal