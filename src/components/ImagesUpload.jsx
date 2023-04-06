import React from 'react'

function ImagesUpload({ size, formDetails, setFormDetails }) {

const imageUploaderElements = [...Array(size)].map((e, i) => 
<div key={i} className='relative flex items-end bg-slate-300 w-[100px] h-[100px] rounded-xl'>
{((formDetails.images[i-1] && !formDetails.images[i]) || (i == 0 && formDetails.images.length == 0)) && <label className='absolute text-center bg-orange-500 hover:bg-orange-400 transition text-white w-full rounded-b-xl' htmlFor={`img-${i}`}>Upload</label>}
<input onChange={(e) => handleImageUpload(e)} className='hidden' id={`img-${i}`} type="file" />
{formDetails.images[i] && <img className=' object-scale-down w-full h-full' alt='not found' src={URL.createObjectURL(formDetails.images[i])} />}
{formDetails.images[i] && 
<button onClick={() => handleImageRemove(formDetails.images[i])} className='absolute flex items-center justify-center border text-center bottom-[88px] left-[88px] rounded-full bg-white w-5 h-5'>  
<span>&times;</span>
</button>}
</div>
)

const handleImageUpload = (e) => {
    const copy = [...formDetails.images]
    copy.push(e.target.files[0])
    setFormDetails({
        ...formDetails,
        images: copy
    })
    e.target.value = null
    }

const handleImageRemove = (file) => {
    const formImages = [...formDetails.images]
    const indexOfFile = formImages.findIndex(fileObject => {
      return fileObject == file
    })
    formImages.splice(indexOfFile, 1)
    setFormDetails({
        ...formDetails,
        images: [...formImages]
    })
    }

  return (
    <div className='w-full'>
    <div className='relative flex justify-center items-center w-full h-full'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div className='flex gap-3'>
        {imageUploaderElements}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ImagesUpload