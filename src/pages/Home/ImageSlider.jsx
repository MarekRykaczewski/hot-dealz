import React, { useState, useEffect } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { RxDotFilled } from 'react-icons/rx'

function ImageSlider({ slides }) {

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }   

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

  return (
    <div className='h-full w-max-full relative group'>
        <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className='w-full h-full bg-center bg-cover duration-500'></div>
        <div className='hidden group-hover:block absolute bottom-12 left-5 text-2xl rounded-full p-1 bg-orange-500 hover:bg-orange-400 transition text-white border-2 border-white shadow-lg cursor-pointer'>
            <BiChevronLeft onClick={prevSlide} size={25} />
        </div>
        <div className='hidden group-hover:block absolute bottom-12 right-5 text-2xl rounded-full p-1 bg-orange-500 hover:bg-orange-400 transition text-white border-2 border-white shadow-lg cursor-pointer'>
            <BiChevronRight onClick={nextSlide} size={25} />
        </div>
        <div className='hidden group-hover:flex w-full items-center justify-center absolute bottom-0 py-2'>
            <div className='flex bg-slate-800 bg-opacity-60 rounded-lg drop-shadow-lg'>
            {slides.map((slide, slideIndex) => (
                <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`cursor-pointer drop-shadow-lg ${currentIndex === slideIndex ? 'text-orange-400' : 'text-white'}`}> 
                    <RxDotFilled size={30} />
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default ImageSlider