import React, { useEffect, useState } from 'react'
import DealCard from './DealCard'
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route, useLocation } from 'react-router-dom'
import DealDetails from './DealDetails/DealDetails'
import Deals from './Deals/Deals';
import Saved from './Deals/Saved/Saved';

function Home() {

  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dealsPerPage, setDealsPerPage] = useState(5)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "deals"));
        for (const doc of querySnapshot.docs) {
          const dealData = doc.data();
          const commentsSnapshot = await getDocs(
            collection(doc.ref, "comments")
          );
          const commentsCount = commentsSnapshot.size;
          list.push({ id: doc.id, ...dealData, comments: commentsCount });
        }
        setDeals(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredDeals(filterDealsByCategory(category, deals));
    } else {
      setFilteredDeals(deals); // Set to unfiltered deals when category is not present
    }
  }, [category, deals]);

const indexOfLastDeal = currentPage * dealsPerPage
const indexOfFirstDeal = indexOfLastDeal - dealsPerPage
const currentDeals = filteredDeals.slice(indexOfFirstDeal, indexOfLastDeal)

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber)
}

function filterDealsByCategory(category, deals) {
  const dealsCopy = [...deals]
  const filteredDeals = dealsCopy.filter(deal => deal.category && deal.category.toLowerCase() === category.toLowerCase())
  return filteredDeals
}

const dealElements = 
    currentDeals.map(item => {
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
    <div className='bg-slate-200 h-screen'>
    <Routes>
      <Route path="/saved/*" element={<Saved 
        dealsPerPage={dealsPerPage} 
        paginate={paginate} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filterDealsByCategory={filterDealsByCategory}
      />}
      />
      <Route path="/deal/*" element={<DealDetails />}/>
      <Route path="/" element={
      <Deals 
        deals={deals}
        setDeals={setDeals}
        dealElements={dealElements} 
        dealsPerPage={dealsPerPage} 
        totalDeals={deals.length} 
        paginate={paginate} 
        currentPage={currentPage}
        filterDealsByCategory={filterDealsByCategory}
        />
      } />
    </Routes>
    </div>
  )
}

export default Home