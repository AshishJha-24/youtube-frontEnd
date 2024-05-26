import React from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
function SingleComment({commentDetails}) {
  console.log(commentDetails);
  
  return (
    <div className=' mt-4'>
      <div className='flex '>
        <div className='mr-1  flex-shrink-0 '>
         <Link to={"/channel/"+(commentDetails?.commentOwner?._id || commentDetails?.tweetOwner?._id)}>  <img src={commentDetails?.commentOwner?.avtar ||commentDetails?.tweetOwner?.avtar} alt=""  className="w-12 h-12 mr-3 rounded-full " />
         </Link> 
        </div>
        <div className=''>
            <p >{commentDetails?.commentOwner?.username || commentDetails?.tweetOwner?.username} . 4 sec ago </p>
            <p className='mt-1'>{commentDetails?.content}</p>
           
            <div className="flex  mt-2 ">
              <div className="flex mr-4 cursor-pointer ">
                {" "}
                <FaThumbsUp className="text-2xl " />{" "}
                <span className="ml-2 ">{commentDetails?.commentLikesCount || commentDetails?.tweetLikeCount}</span>
              </div>
              <div className="flex mr-4 cursor-pointer ">
                {" "}
                <FaThumbsDown className="text-2xl" />{" "}
                <span className="ml-2 ">222</span>
              </div>
             
            </div>
        </div>
      </div>
     
    </div>
  )
}

export default SingleComment
