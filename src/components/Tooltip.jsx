import React, { useState } from 'react'

function Tooltip({ text, subtext, children }) {

  const [firstClick, setFirstClick] = useState(false)
  const [visible, setVisible] = useState(false)  
    
  return (
    <div 
        onFocus={() => {
          setFirstClick(true)
          setVisible(true)
        }}
        onBlur={() => {
          setVisible(false)
        }}
    >
    
    {children}
    {firstClick &&
    <div className={`overflow-hidden ${visible ? 'animate-slidefromtop' : 'animate-contract'}`}>
      <div className={`flex flex-col bg-slate-300 rounded-xl p-3 mt-2`}>
          <span className='text-sm font-bold text-gray-600'>{text}</span>
          <span className='text-xs text-gray-600'>{subtext}</span>
      </div>
    </div>}

    </div>
  )
}

export default Tooltip