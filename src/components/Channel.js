import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Channel() {

  const { userId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userProfile , setUserProfile] = useState({});
  const query = "?userId=" + userId;


  const menuItems = [
    { name: "Video", path: "/channel/"+userId },
    { name: "Playlist", path: "playlist" },
    { name: "Tweet", path: "tweet" },
    { name: "Subscribed", path: "subscribed"},
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchUserProfile = async()=>{
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/c/"+userId,{
        method:"GET",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })

      const profile = await response.json();
      setUserProfile(profile.data);
     
      console.log(userProfile);
      
    } catch (error) {
      console.log("Eroro while fetching user profile"+error)
      
    }
  }

  useEffect(()=>{
    fetchUserProfile()
  },[])

  return (
    <div className="h-full w-full ">
      <div className="w-full">
        <div className="h-60  overflow-hidden border-2 border-white w-full">
          <img
            src={userProfile?.coverImage}
            alt=""
            className=""
          />
        </div>
        <div className="flex   justify-between flex-wrap mr-4 ">
          <div className="relative h-28  md:w-4/5 w-full  ">
            <div className=" -top-10 absolute  ">
              <img
                src={userProfile?.avtar}
                alt=""
                className="lg:h-36 lg:w-36 h-20 w-20 rounded-full"
              />
            </div>

            <div className=" absolute lg:left-40 left-24 top-3">
              <p className=" text-1xl">{userProfile?.fullName}</p>
              <p>@{userProfile?.username}</p>
              <p>{userProfile?.subscribersCount} Subscribers · {userProfile?.channelSubscribedToCount} Subscribed</p>
            </div>
          </div>

          <div className="flex  justify-end   sm:w-1/5 h-16 md:mt-4">
            <button className="bg-red-900 w-24 rounded-md p-2 ">
              Subscribe{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 border-white  mt-2">
        <ul className="flex justify-between ">
        {menuItems.map((item, index) => (
         
            <Link to={item.path} key={index}
              className={` ${activeIndex === index ? 'bg-orange-500' : ''} w-1/4 p-4 `}
              onClick={() => handleClick(index)}
            >
               <li  className="cursor-pointer  ">
              {item.name}
              </li>
            </Link>
          
        ))}
        </ul>
      </div>
      
      <Outlet context={{query:query,
                        userId:userId
      }} />
    </div>
  );
}


export default Channel;
