import React from 'react'

function CategorySelector({ handleInputChange }) {

    const n = 5

    const checkboxElements = [...Array(n)].map((e, i) => 
        <div key={i}>
            <input value={"Test"} onClick={(e) => handleInputChange(e)} name="category" className='peer hidden' id={`category-${i}`} type="radio"/>
            <label className='flex items-center gap-2 peer-checked:bg-orange-100 peer-checked:text-orange-500 peer-checked:border-orange-500 transition font-bold text-slate-500 border rounded-xl py-1 px-5 w-fit' htmlFor={`category-${i}`}>
            <span> Test </span>
            </label>
        </div>
    )    

    return (
    <fieldset className='flex flex-wrap mb-3 gap-3'>
        {checkboxElements}
    </fieldset>
    )
    }

export default CategorySelector