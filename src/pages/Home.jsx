import React, { useEffect, useState } from 'react'
import DealCard from '../components/DealCard'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Routes, Route } from 'react-router-dom'
import DealDetails from './DealDetails'
import Deals from './Deals'

function Home() {

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

const [deals, setDeals] = useState([])

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
           />
        )
    })

  return (
    <div className='bg-slate-400'>
    <Routes>
      <Route path="/deal/*" element={<DealDetails />}/>
      <Route path="/" element={<Deals dealElements={dealElements}/>} />
    </Routes>
    </div>
  )
}

export default Home