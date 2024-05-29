import React, { useState } from 'react'
import EmptyVideoPage from './EmptyVideoPage';
import ListView from './ListView';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function SearchVideoPage() {

  const location = useLocation();
  const [loading, setLoading] = useState(true);
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
         } finally {
          setLoading(false);
        }
       
       
       
         },[videoList])


         if (loading) {
          return <h1>Loading ...</h1>;
        }
      
        if (videoList.length == 0) {
          return <EmptyVideoPage />;
        } else {
          return (
            <>
              { 
             videoList.map((video)=><ListView key={video._id} data={video} />)    
            }
            </>
          );
        }
      }

  

export default SearchVideoPage





 
  
     
 

 


 



 