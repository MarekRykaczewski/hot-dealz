import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Tabs from './Tabs'
import FooterNav from './FooterNav'

function Deals({ deals, setDeals, dealElements, dealsPerPage, totalDeals, paginate, currentPage, filterDealsByCategory }) {
  return (
    <div className='h-screen flex flex-col justify-between'>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-full gap-3 items-center">
      <Tabs
        deals={deals}
        setDeals={setDeals} 
      />
      {dealElements}
      <FooterNav dealsPerPage={dealsPerPage} totalDeals={totalDeals} paginate={paginate} currentPage={currentPage}/>
    </div>
    </div>
  )
}

export default Deals