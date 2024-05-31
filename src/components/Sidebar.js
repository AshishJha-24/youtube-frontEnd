import React from 'react'
import { FaHome } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { MdFolderOpen } from "react-icons/md";
import { ImUserCheck } from "react-icons/im";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineContactSupport } from "react-icons/md";
import {Link} from "react-router-dom"


function Sidebar() {
  return (
    <div className='fixed flex flex-col justify-between m-2  border-2 border-white mt-24 h-3/4'>
    <div className='flex flex-col m-2 text-lg  p-2 '>

     <Link to={"/"}>
      <div className='flex border-2 border-black p-2  hover:bg-orange-500 '>
      <div  ><FaHome size={25} /></div>
      <div className='sm:block hidden ml-4 font-semibold  w-40'>Home</div>
     </div></Link>

    <Link to={"/liked-videos"} >
      <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
        <div><AiOutlineLike size={25} /></div>
        <div className='sm:block hidden ml-4 font-semibold ' >Liked Videos</div>
     </div>
     </Link>


     <Link to={"/history"}>
      <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
       <div><RiHistoryFill size={25} /></div>
       <div className='sm:block hidden ml-4 font-semibold' >History</div>
     </div>
     </Link>


    <Link> <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
      <div><FaVideo size={25} /></div>
      <div className='sm:block hidden ml-4 font-semibold '>My Content</div>
     </div>
     </Link>

     <Link> <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
      <div><MdFolderOpen size={25} /></div>
      <div className='sm:block hidden ml-4 font-semibold '>Collections</div>
     </div>
     </Link>

     <Link to={"/subscription"}>
     <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
      <div><ImUserCheck size={25} /></div>
      <div className='sm:block hidden ml-4 font-semibold ' >Subscriptions</div>
     </div>
     </Link>

    </div>

    <div className='flex flex-col m-2 text-lg p-2  '>

     <Link to={"/home"}>
      <div className='flex border-2 border-black p-2  hover:bg-orange-500'>
      <div ><MdOutlineContactSupport  size={25}/></div>
      <div className='sm:block hidden ml-4 font-semibold'>Supports</div>
     </div></Link>

    <Link to={"/liked-videos"} >
      <div className='flex  border-2 border-black p-2 hover:bg-orange-500 mt-3'>
        <div><IoIosSettings size={25} /></div>
        <div className='sm:block hidden ml-4 font-semibold ' >Settings</div>
     </div>
     </Link>

    </div>


  </div>
  )
}

export default Sidebar
