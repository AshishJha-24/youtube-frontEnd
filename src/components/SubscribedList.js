import React from "react";
import SingleSubscriber from "./SingleSubscriber";
import { useState, useEffect } from "react";

function SubscribedList() {
  const [subscriberList, setSubscriberList] = useState([]);

  const fetchSubscriber = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/subscriptions",
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
      console.log(data)
      setSubscriberList(data.data);
    } catch (error) {
    } finally {
    }
  }

  useEffect(()=>{
    fetchSubscriber();
  },[])

  return (
    <div className="w-full mt-2">
     {
        subscriberList.map((data)=><SingleSubscriber key={data._id} data={data.subscribedChannel}/>
)
     }
    </div>
  );
}

export default SubscribedList;
