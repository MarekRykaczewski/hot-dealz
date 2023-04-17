import React from 'react'
import CategoryCarousel from '../components/CategoryCarousel'
import Tabs from '../components/Tabs'
import FooterNav from '../components/FooterNav'

function Deals({ dealElements }) {
  return (
    <div>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-screen gap-3 justify-start items-center">
      <Tabs />
      {dealElements}
      <FooterNav />
    </div>
    </div>
  )
}

export default Deals