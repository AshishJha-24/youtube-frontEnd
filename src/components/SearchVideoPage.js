import React, { useState } from 'react'
import ListView from './ListView';
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SearchVideoPage() {

  const  query=useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

 console.log("http://localhost:8000/api/v1/video?query="+queryParams.get("query"))

    const [videoList , setvideoList ] = useState([]);
    const fetchVideos  = async () =>{

        const videos = await fetch("http://localhost:8000/api/v1/video?query="+queryParams.get("query"), {
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
       
       
       
         },[videoList])

         return videoList.length==0?(
            <h1>Loading....</h1>
          ):
          (
         <>
            { 
             videoList.map((video)=><ListView key={video._id} data={video} />)    
            }
            
        
           </>  
          )
}

export default SearchVideoPage





 
  
     
 

 


 



 