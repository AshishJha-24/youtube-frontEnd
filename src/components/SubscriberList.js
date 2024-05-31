import React from "react";
import SingleSubscriber from "./SingleSubscriber";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";

function SubscriberList() {
  const [subscriberList, setSubscriberList] = useState([]);
  const {userId} = useParams();
  console.log(userId);
  

  const fetchSubscriber = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/subscriptions/c/"+userId,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const data=await response.json();
      console.log(data.data);
      setSubscriberList(data.data);
    } catch (error) {
    } 
  }

  useEffect(()=>{
    fetchSubscriber();
    console.log(subscriberList)
  },[])

  if(subscriberList.length===0){
    return <h1>loading</h1>
  }
  return (
    <div className="w-full mt-2">
     {
        subscriberList.map((data)=><SingleSubscriber key={data._id} data={data.Channelsubscriber}/>
)
     }
    </div>
  );
}

export default SubscriberList;
