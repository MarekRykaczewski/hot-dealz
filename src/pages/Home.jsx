import React, { useEffect, useState } from 'react'
import DealCard from '../components/DealCard'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route } from 'react-router-dom'
import DealDetails from './DealDetails'
import Deals from './Deals'
import Pagination from '../components/Pagination';

function Home() {

  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dealsPerPage, setDealsPerPage] = useState(2)

  useEffect(() => {
    const fetchData = async () => {
        let list = []
        try {
            const querySnapshot = await getDocs(collection(db, "deals"))
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setDeals(list)
        } catch (err) {
            console.log(err)
        }
    }
    fetchData()
}, [])

const indexOfLastDeal = currentPage * dealsPerPage
const indexOfFirstDeal = indexOfLastDeal - dealsPerPage
const currentDeals = deals.slice(indexOfFirstDeal, indexOfLastDeal)

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber)
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
           />
        )
    })

  return (
    <div className='bg-slate-200'>
    <Routes>
      <Route path="/deal/*" element={<DealDetails />}/>
      <Route path="/" element={<Deals dealElements={dealElements}/>} />
    </Routes>
    <Pagination dealsPerPage={dealsPerPage} totalDeals={deals.length} paginate={paginate}/>
    </div>
  )
}

export default Home