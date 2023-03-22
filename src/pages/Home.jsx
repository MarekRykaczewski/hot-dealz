import React from 'react'
import CategoryCarousel from '../components/CategoryCarousel'
import Tabs from '../components/Tabs'
import DealCard from '../components/DealCard'
import FooterNav from '../components/FooterNav'


function Home() {

  return (
    <div className='bg-slate-400'>
    <CategoryCarousel />
    <div className="flex flex-col w-full gap-3 justify-center items-center">
      <Tabs />
      <DealCard />
      <DealCard />
      <DealCard />
      <DealCard />
      <FooterNav />
    </div>
    </div>
  )
}

export default Home