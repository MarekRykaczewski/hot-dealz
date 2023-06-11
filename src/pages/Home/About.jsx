import React from 'react'
import { ImPriceTag } from 'react-icons/im'
import { GiDiscussion, GiProfit } from 'react-icons/gi'

function About() {
  return (
    <div className='flex flex-col h-full'>
        <div className='flex flex-col gap-3 items-center justify-center py-6 px-[10%] bg-slate-800 h-[300px]'>
            <h1 className='text-4xl text-center first-letter: text-orange-500 font-bold'> Hot Dealz is all about you and the deals you love </h1>
            <p className='text-xl text-white text-center'> Hot dealz is my first full stack project. Here you'll find all the authentic and organic deals shared by users just like you! At Hot Dealz, we believe that everyone deserves access to amazing deals and savings</p>
        </div>
        <div className='p-6'>
            <h1 className='text-3xl text-slate-800'> Why us? </h1>
            <div className='flex gap-3 p-6'>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6">
                    <h1 className="font-bold text-center text-white text-2xl mb-4">
                    Unparalleled Deal Selection
                    </h1>
                    <p className="text-white">
                    We handpick the best deals and discounts across various categories, ensuring you never miss out on great savings.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6">
                    <h1 className="font-bold text-center text-white text-2xl mb-4">
                    Active Community
                    </h1>
                    <p className="text-white">
                    Join our thriving community of deal lovers who share incredible deals, tips, and engage in discussions
                    </p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6">
                    <h1 className="font-bold text-center text-white text-2xl mb-4">
                    User-Friendly Platform
                    </h1>
                    <p className="text-white">
                    Easily navigate our intuitive website, with advanced search filters and personalized recommendations for a seamless shopping experience.
                    </p>
                </div>
            </div>
        </div>
        <div>
            <h1 className='text-3xl text-slate-800 text-center'> How does it work? </h1>
            <div className='flex gap-3 p-6'>
                <div className='flex w-1/3 flex-col items-center gap-3 p-4'> 
                    <ImPriceTag size={70} />
                    <p className='text-center'> Each published opportunity is courtesy of a community member or one of our editors </p>
                </div>
                <div className='flex w-1/3  flex-col items-center gap-3 p-4'> 
                    <GiDiscussion size={70} />
                    <p className='text-center'> Members share opinions on deals by rating them as hot or cold. The higher the temperature, the better the deal! </p>
                </div>
                <div className='flex w-1/3  flex-col items-center gap-3 p-4'> 
                    <GiProfit size={70} />
                    <p className='text-center'> If you take advantage of a deal published on our site, we may receive a commission on the sale. This helps fund our platform </p>
                </div>
            </div>
        </div>
        <button className='text-2xl font-bold self-center bg-orange-500 rounded-lg text-white py-1 px-12'> Join </button>
    </div>
  )
}

export default About