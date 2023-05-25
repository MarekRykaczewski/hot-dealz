import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Tabs from './Tabs'
import FooterNav from './FooterNav'

function Deals({ deals, setDeals, dealElements, dealsPerPage, totalDeals, paginate, currentPage, filterDealsByCategory }) {
  return (
    <div>
    <CategoryCarousel 
      filterDealsByCategory={filterDealsByCategory}
      deals={deals}
    />
    <div className="flex bg-gray-200 flex-col w-full h-full gap-3 justify-start items-center">
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