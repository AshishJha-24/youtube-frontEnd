import React from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import timeAgo from '../utils/timeAgo';

function SingleComment({commentDetails,toggleLike}) {
  console.log(commentDetails);
  const defaultValue=commentDetails.isLiked?"text-blue-900":"";
  const [isCommentLiked,setIsCommentLiked] =useState(defaultValue);
  const [likeCount,setLikeCount]=useState(commentDetails.commentLikesCount || commentDetails.tweetLikeCount)
  
  const toggleLiked= async ({})=>{
    const data =await fetch(toggleLike+commentDetails._id, 
    {
      method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
});
    const liked= await data.json();
   if(liked.data.isLiked){
    setLikeCount(likeCount+1)
    
    setIsCommentLiked("text-blue-900")
    
   }else{
    setLikeCount(likeCount-1)
    setIsCommentLiked("text-white")
    
   }

  
    console.log(liked);
}

    
 
  const commentTime=timeAgo(commentDetails.createdAt);


  
  return (
    <div className=' mt-4'>
      <div className='flex '>
        <div className='mr-1  flex-shrink-0 '>
         <Link to={"/channel/"+(commentDetails?.commentOwner?._id || commentDetails?.tweetOwner?._id)}>  <img src={commentDetails?.commentOwner?.avtar ||commentDetails?.tweetOwner?.avtar} alt=""  className="w-12 h-12 mr-3 rounded-full " />
         </Link> 
        </div>
        <div className=''>
            <p >{commentDetails?.commentOwner?.username || commentDetails?.tweetOwner?.username} . {commentTime} </p>
            <p className='mt-1'>{commentDetails?.content}</p>
           
            <div className="flex  mt-2 ">
              <div className="flex mr-4 cursor-pointer " onClick={toggleLiked}>
                
                <FaThumbsUp className={`${isCommentLiked} text-2xl` }/>
                <span className="ml-2 ">{likeCount || commentDetails?.tweetLikeCount}</span>
              </div>
              <div className="flex mr-4 cursor-pointer ">
                
                <FaThumbsDown className="text-2xl" />
                <span className="ml-2 "></span>
              </div>
             
            </div>
        </div>
      </div>
     
    </div>
  )
}

export default SingleComment
