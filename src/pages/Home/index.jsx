import React, { useEffect, useState } from 'react'
import DealCard from '../../components/DealCard/DealCard';
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route, useLocation } from 'react-router-dom'
import DealDetails from './[id]/DealDetails';
import Deals from './Deals';
import Saved from './Saved';

function Home() {

  const [deals, setDeals] = useState([])
  const [filteredDeals, setFilteredDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [dealsPerPage, setDealsPerPage] = useState(5)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "deals"));
        const dealList = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const dealData = doc.data();
          const commentsSnapshot = await getDocs(collection(doc.ref, "comments"));
          const commentsCount = commentsSnapshot.size;
          return { id: doc.id, ...dealData, comments: commentsCount };
        }));
        setDeals(dealList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (deals.length > 0) setLoading(false)
  }, [deals])

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
        const milliseconds = item.posted.seconds * 1000
        const date = new Date(milliseconds)
        const formattedDate = date.toDateString();
        const formattedTime = date.toLocaleTimeString([], { timeStyle: "short" });

        return (
          <DealCard
            key={item.id}
            postId={item.id}
            title={item.title}
            dealLink={item.dealLink}
            owner={item.owner}
            price={item.price}
            nextBestPrice={item.nextBestPrice}
            description={item.description}
            date={formattedDate}
            time={formattedTime}
            voucherCode={item.voucherCode}
            comments={item.comments}
            userId={item.userId}
            shippingCost={item.shippingCost}
            imageURLs={item.imageURLs}
           />
        )
    })

  if (loading) return (
  <div className='flex justify-center items-center h-screen bg-slate-100' role="status">
    <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
)

  return (
    <div>
    <Routes>
      <Route path="/saved/*" element={<Saved 
        dealsPerPage={dealsPerPage} 
        paginate={paginate} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filterDealsByCategory={filterDealsByCategory}
      />}
      />
      <Route path="/deal/:dealId" element={<DealDetails />}/>
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