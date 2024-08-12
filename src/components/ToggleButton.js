import React from "react";
import { useState } from "react";
const ToggleButton = ({ispublished,setIsOn,isOn,videoId}) => {
   


    const togglePublishVideo=async()=>{
        try {
            const response = await fetch(process.env.API_ENTRYPOINT+"/api/v1/video/toggle/publish/"+videoId,{
                method:"PATCH",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            })

            const data =await response.json();
            if(data){
            
                setIsOn(!isOn);
            }
        } catch (error) {
            console.log("while togglePublishVideo error ::"+error);
        }
    }

    const toggleButton = () => {
        togglePublishVideo();
       
    };

    return (
        <div
            onClick={toggleButton}
            className={`ml-4  w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-orange-500' : 'bg-gray-300'}`}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </div>
    );
};

export default ToggleButton;