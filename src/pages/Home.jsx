import React, { useEffect, useState } from 'react'
import CategoryCarousel from '../components/CategoryCarousel'
import Tabs from '../components/Tabs'
import DealCard from '../components/DealCard'
import FooterNav from '../components/FooterNav'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

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
            title={item.title}
            dealLink={item.dealLink}
            upvotes={item.upvotes}
            owner={item.owner}
            price={item.price}
            lastBestPrice={item.lastBestPrice}
            description={item.description}
            date={item.posted.toDate().toDateString()}
            time={item.posted.toDate().toLocaleTimeString()}
           />
        )
    })

  return (
    <div className='bg-slate-400'>
    <CategoryCarousel />
    <div className="flex flex-col w-full h-screen gap-3 justify-start items-center">
      <Tabs />
      {dealElements}
      <FooterNav />
    </div>
    </div>
  )
}

export default Home