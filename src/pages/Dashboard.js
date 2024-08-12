import React from "react";
import UploadVideo from "../components/UploadVideo";
import { FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import SingleVideoForDashboard from "../components/SingleVideoForDashboard";
import { useState, useEffect } from "react";


function Dashboard() {
    const [stats, setStats]=useState(null);
    const [videos, setVideos]=useState([]);
    const [reload, setReload]=useState(false);
    console.log(reload);

    const fetchStats=async()=>{
        try {
            const response= await fetch(process.env.API_ENTRYPOINT+"/api/v1/dashboard/stats",{
                credentials:"include",
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
            })

            const data = await response.json();
            console.log(data.data[0]);
            setStats(data.data[0]);


            const responseofVideo= await fetch(process.env.API_ENTRYPOINT+"/api/v1/dashboard/videos",{
                credentials:"include",
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
            })

            const dataofVideo = await responseofVideo.json();
            console.log(dataofVideo.data);
            setVideos(dataofVideo.data);
           
            

        } catch (error) {
            console.log("error "+error);
        }
    }

    useEffect(()=>{
        fetchStats();
       
    },[reload])
  return (
    <div className="w-full h-full  relative ">
      <div className="w-full  flex justify-between flex-wrap">
        <div>
          <p className="text-3xl font-bold mb-2 ">
            Welcome Back, React Patterns
          </p>
          <p>Seamless Video Management, Elevated Results.</p>
        </div>
        <div>
          <UploadVideo setReload={setReload} />
        </div>
      </div>
      <div className="flex w-full mt-4 lg:flex-row flex-col">
        <div className="w-full border-2 border-white mr-2 p-4 mb-2">
          <div className="mb-4">
            <FaEye className="text-2xl" />
          </div>
          <p>Total views</p>
          <p className="font-bold text-3xl">{stats?.totalViews || 0}</p>
        </div>
        <div className="w-full border-2 border-white mr-2 p-4 mb-2">
          <div className="mb-4">
            <FaVideo className="text-2xl" />
          </div>
          <p>Total videos</p>
          <p className="font-bold text-3xl">{stats?.totalVideos || 0}</p>
        </div>
        <div className="w-full border-2 border-white mr-2 p-4 mb-2">
          <div className="mb-4">
            <FaUser className="text-2xl" />
          </div>
          <p>Total subscribers</p>
          <p className="font-bold text-3xl">{stats?.totalSubscriber || 0}</p>
        </div>
        <div className="w-full border-2 border-white p-4 mb-2">
          <div className="mb-4">
            <FaHeart className="text-2xl" />
          </div>
          <p>Total likes</p>
          <p className="font-bold text-3xl">{stats?.totallikes || 0}</p>
        </div>
      </div>
      <div className="border-2 border-white mt-4">
        <table className="w-full  text-center">
            <thead>
          <tr >
            <th className="p-4">Status</th>
            <th>Status</th>
            <th>Uploaded</th>
            <th>Rating</th>
            <th>Date uploaded</th>
          </tr>
          </thead>
          <tbody>

         {videos.map((video)=>(<SingleVideoForDashboard key ={video._id} details={video} setReload={setReload} />))}
         
         </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;


