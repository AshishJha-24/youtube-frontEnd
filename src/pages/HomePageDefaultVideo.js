import React, { useState } from "react";
import EmptyVideoPage from "./EmptyVideoPage";
import CardView from "../components/CardView";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function HomePageDefaultVideo({ query }) {
 

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [videoList, setvideoList] = useState([]);
  const [hasmoreData, sethasmoreData]=useState(true);
  
  if (!query) {
    query =`?page=${page}`;
  }else{
    query+=`&page=${page}`
  }
  
  const fetchVideos = async () => {
    
    try {

      const videos = await axios.get(`${process.env.API_ENTRYPOINT}+/api/v1/video${query}`,{
        withCredentials:true,
      })
      console.log(videos);
  
    if(videos.data.data.length===0){
      sethasmoreData(false);
    }
      setvideoList((prev)=>[...prev,...videos?.data.data]);
      setPage(prevPage => prevPage + 1);
      console.log(videoList);
    } catch (error) {
      console.log("error while feteching videos " , {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasmoreData) {
      fetchVideos(); // Fetch more data when the target element becomes visible
    }
  };

  useEffect(() => {
    if(loading){
      fetchVideos();
    }else{
// Create intersection observer
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 1.0 // Fully visible
});

// Observe a target element (e.g., the last item in the list)
const targetElement = document.getElementById('intersection-target');
if (targetElement) {
  observer.observe(targetElement);
}

// Cleanup
return () => observer.disconnect();
    }
      
  }, [query]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (videoList.length == 0) {
    return <EmptyVideoPage />;
  } else {
    return (
      <>
        {videoList.map((video) => (
          <CardView key={video._id} data={video} />
        ))}

<div id="intersection-target" style={{ height: '10px' }} className="m-8  flex w-full justify-center  "> {hasmoreData?<Spinner/>:(<h1>No more Data </h1>) }</div> {/* Target element for intersection observer */}
{loading && <p>Loading...</p>}
      </>
    );
  }
}

export const VideosForProfile = (HomePageDefaultVideo) => {
  return () => {
    const context = useOutletContext();
    console.log(context);
    return (
      <div className="flex flex-wrap ">
        <HomePageDefaultVideo query={context.query} />
      </div>
    );
  };
};

export default HomePageDefaultVideo;
