import React, { useState } from 'react'
import CardView from './CardView'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function HomePageDefaultVideo({query}) {
 
  if(!query){
     query="";
  }

  const [videoList , setvideoList ] = useState([]);
 

 const fetchVideos  = async () =>{

  const videos = await fetch("http://localhost:8000/api/v1/video"+query, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }

  });

   const videoslist = await videos.json();

  
   setvideoList(videoslist?.data);
   
   console.log(videoList)
 

 }




  useEffect(  ()=>{
 try{
  fetchVideos()
 
  console.log(videoList)
  
  }catch(error){
    console.log("error while feteching videos "+ error)
  }



  },[query])

  
  return videoList.length==0?(
    <h1>Loading....</h1>
  ):
  (
 <>
    { 
     videoList.map((video)=><CardView key={video._id} data={video} />)    
    }
    

   </>  
  )
}


export const VideosForProfile=(HomePageDefaultVideo)=>{
  return ()=>{
   const context= useOutletContext();
   console.log(context)
     return (
      <div className="flex flex-wrap ">
       <HomePageDefaultVideo query={context.query } />
      </div>
)
  }
}

export default HomePageDefaultVideo
