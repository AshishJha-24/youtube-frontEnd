import React from 'react'
import logo from '../logo.jpeg'

function EmptyVideoPage() {
  return (
    <div className='min-h-screen w-full  sm:ml-72 ml-4 mr-4 flex items-center justify-center '>
        <div>
        <div className=' flex justify-center m-4 '>
          <img className='w-20  rounded-full' src={logo} alt="" />
        </div>
        <div className='text-center '>
            <p className='font-bold align-middle'>No videos available</p>
            <p>There are no videos here available. </p>
            <p> Please try to search some thing else.</p>
        </div>
        </div>
    </div>
  )
}

export default EmptyVideoPage
