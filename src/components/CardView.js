import React from "react";
import { Link } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

function CardView({ data }) {
  console.log(data);
    let hour=Math.trunc(data.duration/(60*60));
  
    let minute=Math.trunc((parseInt(data.duration)-(hour*60*60))/60);
   
    let second=(parseInt(data.duration)-(hour*60*60)-(minute*60));
    if(second<0){
      second=0;
    }

    console.log(hour+" "+minute+" "+second)
    let duration="";
    if(hour!=0){
      duration+=Math.trunc(hour)+":";
    }

      duration+=Math.trunc(minute)+":";
  
    duration+=Math.trunc(second);


    const uploadedAgo = timeAgo(data.createdAt);

  return (
    <>
      <div className=" w-80 mt-4 ml-6 ">
        <Link to={"/video/" + data._id}>
          <div className="border-2 border-white relative w-80 h-80">
            <img src={data.thumbnail} alt="" className="w-full h-full" />
            <p className="bg-black absolute bottom-0 right-0  text-white p-1  border-2 border-white">
              {duration}
            </p>
          </div>
        </Link>
        <div className="flex mt-2 ">
          <div className="m-2 ">
            <Link to={"/channel/"+data?.ownerDetails?._id}>
            <img
              src={data.ownerDetails.avtar}
              alt=""
              className="w-14 h-14 rounded-full"
            />
            </Link>
          </div>
          <div>
            <p>{data.title}</p>
            <p>{data.views} Views · {uploadedAgo} </p>
            <p>{data.ownerDetails.username}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardView;
