import React from 'react'
import CategoryCarousel from '../../components/CategoryCarousel'
import Tabs from '../../components/Tabs'
import FooterNav from '../../components/FooterNav'

function Deals({ deals, setDeals, dealElements, dealsPerPage, totalDeals, paginate, currentPage, filterDealsByCategory }) {
  return (
    <div className='h-screen flex flex-col justify-between'>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-full gap-2 items-center">
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