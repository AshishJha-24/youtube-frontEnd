import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import CardView from './CardView';
import Search from './Search';
import EmptyVideoPage from './EmptyVideoPage';
import ListView from './ListView';
import { Link, Outlet } from 'react-router-dom';


function HomePage() {

     const[user, setUser] =useState({});

      const data=   useSelector((state)=>state.user)
      
     console.log(data);

     
     useEffect( ()=>{
      setUser(data.user)

     },[data])


     console.log(JSON.parse(localStorage.getItem("user")))

   
     
  return (
    <>

    <div className=''>
    <Search/>
    <div className='flex  h-full'>
      <Sidebar/>
      <div className='flex flex-wrap sm:justify-normal sm:ml-72 justify-center ml-32 mr-4 mt-24 w-full  '>   
      <Outlet/>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default HomePage
