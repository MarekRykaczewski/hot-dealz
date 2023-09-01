import React, { useEffect, useState } from 'react'
import CategoryCarousel from '../CategoryCarousel'
import Tabs from '../Tabs'
import FooterNav from '../FooterNav'
import DealCard from '../DealCard'
import { db } from '../../../config/firebase'
import { getDocs, collection } from "firebase/firestore";
import { auth } from '../../../config/firebase'

function Saved({ dealsPerPage, paginate, currentPage, filterDealsByCategory }) {
  
    const [deals, setDeals] = useState([])
    const userId = auth.currentUser?.uid

    const totalDeals = deals.length

    useEffect(() => {
        const fetchData = async () => {
          try {
            const savedRef = collection(db, 'users', userId, 'saved');
            const savedSnapshot = await getDocs(savedRef);
            const savedDealIds = savedSnapshot.docs.map((doc) => doc.id);
    
            const querySnapshot = await getDocs(collection(db, 'deals'));
    
            const fetchedDeals = [];
            for (const doc of querySnapshot.docs) {
              const dealData = doc.data();
              const commentsSnapshot = await getDocs(collection(doc.ref, 'comments'));
              const commentsCount = commentsSnapshot.size;
    
              if (savedDealIds.includes(doc.id)) {
                fetchedDeals.push({ id: doc.id, ...dealData, comments: commentsCount });
              }
            }
    
            setDeals(fetchedDeals);
          } catch (err) {
            console.log(err);
          }
        };
    
        if (userId) {
          fetchData();
        }
      }, [userId]);
      
      const dealElements = 
      deals.map(item => {
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
              date={item.posted.toDate().toDateString()}
              time={item.posted.toDate().toLocaleTimeString()}
              voucherCode={item.voucherCode}
              comments={item.comments}
             />
          )
      })
  
    return (
    <div>
    <CategoryCarousel />
    <div className="flex bg-gray-200 flex-col w-full h-full gap-3 justify-start items-center">
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