import React, { useState } from "react";
import ListView from "../components/ListView";
import { useEffect } from "react";
import EmptyVideoPage from "./EmptyVideoPage";

function LikedVideos() {
  const [videoList, setvideoList] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchVideos = async () => {
    try {
    const videos = await fetch(process.env.API_ENTRYPOINT+"/api/v1/likes/videos", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const videoslist = await videos.json();

    console.log(videoslist.data);
    setvideoList(videoslist.data)

    console.log(videoList);
  }catch (error) {
  console.log("error while feteching videos " + error);
} finally {
  setLoading(false);
}
}

  useEffect(() => {
    
      fetchVideos();

     
  }, []);

 

  if (loading) {
    return <h1>Loading ...</h1>;
  }

   if (videoList.length > 0) {
    return (
      <>
        {videoList.map((video) => (
          <ListView key={video.likedVideos._id} data={video?.likedVideos} />
        ))}
      </>
    );
   
  } 
  else {
    return <EmptyVideoPage />;
  }
}

export default LikedVideos;
