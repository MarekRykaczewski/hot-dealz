import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import Tabs from './Tabs'
import FooterNav from './FooterNav'

function Deals({ dealElements, dealsPerPage, totalDeals, paginate, currentPage, sortByNewest, sortByComments }) {
  return (
    <div>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-screen gap-3 justify-start items-center">
      <Tabs 
        sortByNewest={sortByNewest} 
        sortByComments={sortByComments}
      />
      {dealElements}
      <FooterNav dealsPerPage={dealsPerPage} totalDeals={totalDeals} paginate={paginate} currentPage={currentPage}/>
    </div>
    </div>
  )
}

export default Deals