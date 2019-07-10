import React from 'react'

export const Front = ({children}) => (
  
)

export default const Flip = ({children, flip}) => (
  <div className='flip-container'>
    <div className='flipper'>
      {children}
    </div>
  </div>
)
