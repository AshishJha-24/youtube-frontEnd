import React, { useEffect } from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState,useRef } from 'react';
import axios from 'axios';
import timeAgo from '../utils/timeAgo';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';

function SingleComment({commentDetails,toggleLike,videoOwner,setPage,deleteApi,updateApi}) {

  
 const {_id,isLiked,content,owner,createdAt}=commentDetails;
 const {avtar,username,}= commentDetails?.commentOwner||commentDetails?.tweetOwner;


  const defaultValue=isLiked?"text-blue-900":"";
  const [isCommentLiked,setIsCommentLiked] =useState(defaultValue);
  const [editOption,setEditOption]=useState(false);
  const [likeCount,setLikeCount]=useState(commentDetails.commentLikesCount || commentDetails.tweetLikeCount||0)
  const [updateText, setUpdateText]=useState(content)
  const [message, setMessage]=useState(content);
  const textareaRef = useRef(null);
 
const currentUser = useSelector((state)=>state.user)
console.log(commentDetails);


console.log(currentUser.user._id+" "+commentDetails?.tweetOwner?._id+" "+owner)



  const autoResize = () => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
};
 useEffect(()=>{
  autoResize()
 },[editOption])


  
  const toggleLiked= async ({})=>{


    const data =await fetch(toggleLike+_id, 
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

  
}
const updateValue = async()=>{
  try {
    const updatedValue = await axios.patch(updateApi+_id,
       {
        content:updateText
      },
      {
      withCredentials: true,
     
      headers: {
        'Content-Type': "application/json",
      }
    }
    )
    if(updateValue){
      
      setMessage(updatedValue.data.data.content)
    }
   
  } catch (error) {
    console.log("error while updating comment :: "+error);
  }finally{
    setEditOption(false);
  }
 

  
}
    
 
  const commentTime=timeAgo(createdAt);

const deleteComment=async ()=>{
  try {

    const response = await axios.delete(deleteApi+_id,{
      withCredentials:true
    })
    console.log(response.data);
    setPage(1);
  } catch (error) {
    console.log("Error while deleting comment ::: "+error);
  }
}
  
  return (
    <div className=' mt-4 pb-4 thin-line '>
      <div className='flex  '>
        <div className='mr-1  flex-shrink-0 '>
         <Link to={"/channel/"+owner }>  <img src={avtar} alt=""  className="w-12 h-12 mr-3 rounded-full " />
         </Link> 
        </div>
        <div className=' w-full'>
            <p className='text-justify '>{username} . {commentTime} </p>
           {!editOption?( <p className='mt-1'>{message}</p>):
           (<div>
             <textarea ref={textareaRef} id="auto-resize-textarea"   className="w-full overflow-hidden bg-black p-4  rounded-md resize-none border-b-2 border-white outline-none  " type='text'  value={updateText} onChange={
             (e)=>{
              
               setUpdateText(e.target.value)
          
             }
             } />

             
             <div className=" flex justify-end">
             <div className="mr-2 ">
              <button
                className="bg-orange-500 p-3 rounded-lg"
                onClick={() => {
                  setUpdateText(message)
                 setEditOption(false)
                }}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="bg-orange-500 p-3 rounded-lg"
                onClick={updateValue}
              >
                Save
              </button>
            </div>
          </div>
          </div>
           )}
           
           
            <div className="flex  mt-4  ">
              <div className="flex mr-4 cursor-pointer " onClick={toggleLiked}>
                
                <FaThumbsUp className={`${isCommentLiked} text-2xl` }/>
                <span className="ml-2 ">{likeCount}</span>
              </div>
              <div className="flex mr-4 cursor-pointer ">
                
                <FaThumbsDown className="text-2xl" />
                <span className="ml-2 "></span>
              </div>
             
            </div>
        </div>
       
        <div className='flex'>
        {currentUser.user._id===owner &&   <div>
         <MdEdit className="inline-block text-2xl ml-2 cursor-pointer" onClick={()=>{
        setEditOption(true)
       }} />
       </div>}
       {(currentUser.user._id===owner || currentUser.user._id ===videoOwner) &&
       <div>
       <RiDeleteBin6Fill  className="inline-block text-2xl ml-4 cursor-pointer" onClick={deleteComment} />
       </div>
}
        </div>

      </div>
     
    </div>
  )
}

export default SingleComment
