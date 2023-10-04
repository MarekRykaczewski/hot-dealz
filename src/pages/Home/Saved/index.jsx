import React, { useEffect, useState } from 'react'
import CategoryCarousel from '../../../components/CategoryCarousel'
import Tabs from '../../../components/Tabs'
import FooterNav from '../../../components/FooterNav'
import DealCard from '../../../components/DealCard/DealCard'
import { auth } from '../../../config/firebase'
import { fetchSavedDeals } from '../../../api'

function Saved({ dealsPerPage, paginate, currentPage }) {
  
    const [deals, setDeals] = useState([])
    const userId = auth.currentUser?.uid

    const totalDeals = deals.length

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (userId) {
            const fetchedDeals = await fetchSavedDeals(userId);
            setDeals(fetchedDeals);
          }
        } catch (err) {
          console.error('Error fetching saved deals:', err);
        }
      };
  
      fetchData();
    }, [userId]);
      
      const dealElements = 
      deals.map(item => {
        const milliseconds = item.posted.seconds * 1000
        const date = new Date(milliseconds)
        const formattedDate = date.toDateString();
        const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });
          return (
            <DealCard
              key={item.id}
              postId={item.id}
              title={item.title}
              imageCount={item.imageCount}
              dealLink={item.dealLink}
              owner={item.owner}
              price={item.price}
              nextBestPrice={item.nextBestPrice}
              description={item.description}
              date={formattedDate}
              time={formattedTime}
              voucherCode={item.voucherCode}
              comments={item.comments}
              imageURLs={item.imageURLs}
             />
          )
      })
  
    return (
    <div>
    <CategoryCarousel />
    <div className="flex bg-gray-200 flex-col w-full h-screen gap-3 justify-start items-center">
      <Tabs
        deals={deals}
        setDeals={setDeals} 
      />
      {deals.length > 0 ? dealElements : <div> Nothing here! </div>}
      <FooterNav dealsPerPage={dealsPerPage} totalDeals={totalDeals} paginate={paginate} currentPage={currentPage}/>
    </div>
    </div>
  )
}

export default Saved