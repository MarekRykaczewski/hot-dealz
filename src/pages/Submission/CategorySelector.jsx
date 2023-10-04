import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../../api';
import { useFormContext } from "react-hook-form";

function CategorySelector({ handleInputChange }) {

    const [categories, setCategories] = useState([])

    const { register, formState: { errors } } = useFormContext();

    useEffect(() => {
        const fetchData = async () => {
          const categories = await fetchCategories();
          setCategories(categories);
        };
      
        fetchData();
      }, []);
  
    const n = categories.length

    const checkboxElements = [...Array(n)].map((e, i) => 
        <div key={i}>
            <input 
                {...register("category", { required: "This is required." })} 
                value={categories[i].title} onClick={(e) => handleInputChange(e)} 
                name="category" className='peer hidden' id={`category-${i}`} 
                type="radio"/>
            <label 
                className='flex items-center gap-2 peer-checked:bg-orange-100 peer-checked:text-orange-500 peer-checked:border-orange-500 transition font-bold text-slate-500 border rounded-xl py-1 px-5 w-fit' 
                htmlFor={`category-${i}`}
            >
            <span> {categories[i].title} </span>
            </label>
        </div>
    )    

    return (
    <div>
        <fieldset className='flex flex-wrap mb-0 gap-3'>
            {checkboxElements}
        </fieldset>
        <span className='text-sm text-red-500 mt-1'>{errors.category?.message}</span>
    </div>

    )
    }

export default CategorySelector