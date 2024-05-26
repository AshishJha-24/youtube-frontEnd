import React from 'react'
import logo from "../logo.jpeg"
function Search() {
  return (
    <div className='flex sm:justify-between  mb-4 p-2 items-center fixed top-0 w-full z-10  bg-gray-900  '>
       <div className='w-10  h-10'>
        <img  src={logo} alt="" />
       </div>
       <div>
        <input type="text" name="search" placeholder='Search '  className=' border-2 border-white placeholder:text-slate-400 "bg-gray-50 dark:bg-gray-900  p-4 w-96 text-white h-10 '/>

       </div>
       <div className='flex items-start flex-row'>
        <div  className="bg-orange-500 m-2 ">
            <button className='p-2'>logIn</button>
        </div>
        <div  className="bg-orange-500 m-2  ">
            <button className='p-2'>Sign Up </button>
        </div>
       
        </div> 
    </div>
  )
}

export default Search
