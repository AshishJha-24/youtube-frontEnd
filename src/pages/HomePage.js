import React, {useState } from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';

import {  Outlet } from 'react-router-dom';


function HomePage() {

  const navigation = useNavigate();

      const data=   useSelector((state)=>state.user)
      if(!data){
           navigation("/login");
      }
    

   
     
  return (
    <>

    <div className=''>
    <Search />
    <div className='flex  h-screen'>
      <Sidebar/>
      <div className='flex flex-wrap  sm:justify-normal sm:ml-72 justify-center ml-32 mr-4 mt-24 w-full  '>   
      <Outlet />
      </div>
    </div>
    </div>
   
    </>
  )
}

export default HomePage
