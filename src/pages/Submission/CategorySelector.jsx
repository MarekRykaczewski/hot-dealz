import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'

function CategorySelector({ handleInputChange }) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "itemCategories"))
                querySnapshot.forEach((doc) => {
                    list.push(doc.data())
                });
                setCategories(list)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const n = categories.length

    const checkboxElements = [...Array(n)].map((e, i) => 
        <div key={i}>
            <input value={categories[i]} onClick={(e) => handleInputChange(e)} name="category" className='peer hidden' id={`category-${i}`} type="radio"/>
            <label className='flex items-center gap-2 peer-checked:bg-orange-100 peer-checked:text-orange-500 peer-checked:border-orange-500 transition font-bold text-slate-500 border rounded-xl py-1 px-5 w-fit' htmlFor={`category-${i}`}>
            <span> {categories[i].title} </span>
            </label>
        </div>
    )    

    return (
    <fieldset className='flex flex-wrap mb-0 gap-3'>
        {checkboxElements}
    </fieldset>
    )
    }

export default CategorySelector