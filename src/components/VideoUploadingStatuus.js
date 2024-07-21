import React from 'react'
import { FaFileVideo } from "react-icons/fa";
import { useRef } from 'react';

function VideoUploadingStatuus({abortControllerRef,closeModal,size,progressComplete,setReload}) {


    function bytesToMegabytes(bytes) {
        return Number(bytes / (1024 * 1024)).toFixed(2);
    }
    console.log("size while uploading on server"+size)
    const mb=bytesToMegabytes(size);
  return (
    <div className="p-4 rounded-lg border-2 border-white shadow-lg  bg-gray-50 dark:bg-gray-900  dark:text-white  lg:w-1/3 w-full ">
    <div className="">
      <p className="text-2xl ">Uploading Video...</p>
      <p className="mb-4 ">Track your video uploading process.</p>
    </div>
    <div className="thin-border p-4 mb-4">
    <div className="flex mt-2 mb-2">
      <div>
        <FaFileVideo className=" text-4xl text-orange-500 mr-2"/>
      </div>
      <div >
        <p className="text-xl">Dashboard prototype recording.mp4</p>
        <p>{mb}MB</p>
      </div>
     
    </div>
    <div className="flex justify-center items-center">
     {progressComplete!="Uploaded Successfully "&& <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full" role="status">
        <span className="visually-hidden"></span>
      </div>}
      <p className='ml-2'>{progressComplete}</p>
    </div>
    </div>

<div className="flex">
    <div className="w-full"><button  disabled={progressComplete==="Uploaded Successfully "?true:false}  className={` p-4 border-2 border-white lg:w-full ${progressComplete==="Uploaded Successfully "?"cursor-not-allowed":"cursor-pointer"}`} onClick={ () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.cancel("Upload canceled by the user.");
    }
    closeModal();
  }}>Cancel</button></div>
    <div className="w-full"><button  disabled={progressComplete==="Uploaded Successfully "?false:true} id="finish"   className={`p-4 border-2 border-white lg:80 w-full ml-2  ${progressComplete==="Uploaded Successfully "?"cursor-pointer bg-orange-500":"cursor-not-allowed bg-orange-400"}`}  onClick={()=>{
    setReload(prev=>!prev)
    closeModal();
    }}>Finish</button></div>
    </div>
    </div>
  )
}

export default VideoUploadingStatuus
