import React from 'react'
import Navbar from './navbar'

export default function Error500() {
  return ( <>
  <Navbar />
  <div className='d-flex justify-content-center my-3'>

    <img style={ {width: '90vw', height: '90vh'} } src={require('../assets/error-500.jpg')} />

  </div>
  
  </>
    
  )
}
