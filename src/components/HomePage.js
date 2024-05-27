import React, {useState } from 'react'
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Search from './Search';

import {  Outlet } from 'react-router-dom';


function HomePage() {

  
      const data=   useSelector((state)=>state.user)
    

   
     
  return (
    <>

    <div className=''>
    <Search />
    <div className='flex  h-full'>
      <Sidebar/>
      <div className='flex flex-wrap sm:justify-normal sm:ml-72 justify-center ml-32 mr-4 mt-24 w-full  '>   
      <Outlet />
      </div>
    </div>
    </div>
   
    </>
  )
}

export default HomePage
