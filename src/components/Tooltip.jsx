import React, { useState } from 'react'

function Tooltip({ text, subtext, children }) {

  const [visible, setVisible] = useState(false)  
    
  return (
    <div 
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
    >
    
    {children}
    {visible && 
    <div className='overflow-hidden mb-3 animate-slidefromtop'>
      <div className={`flex flex-col bg-slate-300 rounded-xl p-3`}>
          <span className='text-sm font-bold text-gray-600'>{text}</span>
          <span className='text-xs text-gray-600'>{subtext}</span>
      </div>
    </div>}

    </div>
  )
}

export default Tooltip