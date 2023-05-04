import React from 'react'
import CategoryCarousel from '../components/CategoryCarousel'
import Tabs from '../components/Tabs'
import FooterNav from '../components/FooterNav'

function Deals({ dealElements, dealsPerPage, totalDeals, paginate }) {
  return (
    <div>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-screen gap-3 justify-start items-center">
      <Tabs />
      {dealElements}
      <FooterNav dealsPerPage={dealsPerPage} totalDeals={totalDeals} paginate={paginate}/>
    </div>
    </div>
  )
}

export default Deals