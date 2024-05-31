import React from "react";
import { Link } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

 function  ListView ({ data }){
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

    return(
        <>

       <div className="flex md:flex-nowrap flex-wrap w-full mt-4 ">
        <div className="md:w-3/6 w-full mr-4 md:h-full ">
       <Link to={"/video/" + data._id}  >
        <div  className='  w-full h-80  relative '>
       
        <img src={data.thumbnail} alt=""  className="  h-full w-full  " />
        <p className="bg-black absolute bottom-0 right-0  text-white p-1">{duration}</p>
      
        </div>
        </Link>
        </div>
       

        <div className=" w-full mt-1  mb-4 md:border-0 border-2 rounded-xl border-white p-4 ">
        <p className="font-bold">{data.title}</p>
        <p className="pt-4 ">{data.views} Views · {uploadedAgo} </p> 
            <div className="flex items-center pt-4 ">
                <Link to={"/channel/"+data?.ownerDetails?._id}>
            <img src={data.ownerDetails.avtar} alt=""  className='w-14 h-14 rounded-full  mr-4 '/>
            </Link>
            <p className="font-bold">{data.ownerDetails.username}</p>
            </div>

                <p className="pt-4">{data?.description}</p>

        </div>

       </div>
        </>
    )
}


export default ListView;






