import React, { useEffect, useState } from 'react'
import CategoryCarousel from '../../../components/CategoryCarousel'
import Tabs from '../../../components/Tabs'
import FooterNav from '../../../components/FooterNav'
import DealCard from '../../../components/DealCard/DealCard'
import { db } from '../../../config/firebase'
import { getDocs, collection, query, where, getFirestore } from "firebase/firestore";
import { auth } from '../../../config/firebase'

function Saved({ dealsPerPage, paginate, currentPage }) {
  
    const [deals, setDeals] = useState([])
    const userId = auth.currentUser?.uid

    const totalDeals = deals.length

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (userId) {
            const firestore = getFirestore();
            const savedRef = collection(firestore, 'users', userId, 'saved');
            const savedSnapshot = await getDocs(savedRef);
            const savedDealIds = savedSnapshot.docs.map((doc) => doc.id);
  
            if (savedDealIds.length === 0) {
              // No saved deals, no need to query
              setDeals([]);
              return;
            }
  
            const dealsQuery = query(collection(firestore, 'deals'), where('__name__', 'in', savedDealIds));
            const querySnapshot = await getDocs(dealsQuery);
  
            const fetchedDeals = [];
            querySnapshot.forEach((doc) => {
              const dealData = doc.data();
              const commentsSnapshot = getDocs(collection(doc.ref, 'comments'));
              const commentsCount = commentsSnapshot.size;
              fetchedDeals.push({ id: doc.id, ...dealData, comments: commentsCount });
            });
  
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