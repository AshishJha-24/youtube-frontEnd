import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import dname from "../utils/apidomainName";


function Channel() {

  const { userId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userProfile , setUserProfile] = useState({});
  const query = "?userId=" + userId;
  const [subscribeBtnStyle,setSubscribeBtnStyle]=useState({bgColor:"bg-red-900",text:"Subscribe"});
  const[reloadAfterClickOnSubscribeBtn,setReloadAfterClickOnSubscribeBtn]=useState(true);

  const data=   useSelector((state)=>state.user)
  console.log(data);
console.log(dname)

  const menuItems = [
    { name: "Video", path: "/channel/"+userId },
    { name: "Playlist", path: "playlist" },
    { name: "Tweet", path: "tweet" },
  ];

  if(data.user._id===userId){
    menuItems.push({name:"Subscribers",path:"subscriber"})
  }
  

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchUserProfile = async()=>{
    try {
      const response = await fetch(dname+"/api/v1/users/c/"+userId,{
        method:"GET",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })

      const profile = await response.json();
      console.log(profile.data);
      if(profile.data.isSubscribed){
        setSubscribeBtnStyle({bgColor:"",text:"Subscribed"})
      }
      setUserProfile(profile.data);

     

     
      console.log(userProfile);
      
    } catch (error) {
      console.log("Eroro while fetching user profile"+error)
      
    }
  }

  const toggleSubscribe=async ()=>{
    try {
      const response = await fetch("http://localhost:8000/api/v1/subscriptions/c/"+userId,{
        method:"POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      const subscriptionDetail=await response.json();
      console.log(subscriptionDetail)
      if(subscriptionDetail.data.subscribed){
        setSubscribeBtnStyle({bgColor:"",text:"Subscribed"})
      }else{
        setSubscribeBtnStyle({bgColor:"bg-red-900",text:"Subscribe"})
      }
      setReloadAfterClickOnSubscribeBtn(!reloadAfterClickOnSubscribeBtn);
     
    } catch (error) {
      console.log("error while subscribing channel"+error);
    }
  }

  useEffect(()=>{
    fetchUserProfile()
  },[userId,reloadAfterClickOnSubscribeBtn])

  return (
    <div className="h-full w-full ">
      <div className="w-full">
        <div className="h-60  overflow-hidden border-2 border-white w-full">
          <img
            src={userProfile?.coverImage}
            alt=""
            className="object-fill h-full w-full"
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
{data.user._id!==userId?
          (<div className="flex  justify-end   sm:w-1/5 h-16 md:mt-4 ">
            <button className={ `${subscribeBtnStyle.bgColor} w-24 rounded-md p-2 border-2 border-white`} onClick={toggleSubscribe}>
            {subscribeBtnStyle.text}
            </button>
          </div>):""
}
        </div>
      </div>

      <div className="border-2 border-white  mt-2 sticky top-24 z-10 bg-gray-50 dark:bg-gray-900  dark:text-white ">
        <ul className="flex justify-between ">
        {menuItems.map((item, index) => (
         
            <Link to={item.path} key={index}
              className={` ${activeIndex === index ? 'bg-orange-500' : ''} w-full p-4 `}
              onClick={() => handleClick(index)}
            >
               <li  className="cursor-pointer ">
              {item.name}
              </li>
            </Link>
          
        ))}
        </ul>
      </div>
      <div>
      
      <Outlet context={{query:query,
                        userId:userId
      }} />
      </div>
    </div>
  );
}


export default Channel;
