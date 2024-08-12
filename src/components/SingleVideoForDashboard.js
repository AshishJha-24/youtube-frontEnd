import React from "react";
import ToggleButton from "./ToggleButton";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ToggleButton from "./ToggleButton";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import EditVideoPopup from "./EditVideoPopup";

function SingleVideoForDashboard({details,setReload}) {
  console.log(details);
  const [isOn, setIsOn] = useState(details?.isPublished);
  const {day,month,year}=details.createdAt;
  const [showSpinner,setShowSpinner]=useState(false);
  const [editPopVisible, setEditPopVisible] = useState(false);

  

  const {_id,isPublished,thumbnail,title,totalLikes} =details;


  const deleteVideo = async ()=>{
    setShowSpinner(true);
    try {
    const response=  await axios.delete(`${process.env.API_ENTRYPOINT}/api/v1/video/${_id}`,{
      withCredentials: true,
    });
     console.log(response);
     if(response){
      setReload(prev=>!prev);
     }
  
    } catch (error) {
      console.log("failed to delete the video:: "+error);
    }finally{
      setShowSpinner(false)
    }
  }


  const openEditBox =()=>{
    setEditPopVisible(true);
  }
  const closeEditBox=()=>{
    setEditPopVisible(false);
  }



  return (
    <>
     <tr className="w-full border-2 border-white ">
            <td>
                <ToggleButton videoId={_id} ispublished={isPublished} setIsOn={setIsOn} isOn={isOn}/>
            </td>
            <td>
             {isOn&& <div className="p-2 border-2 border-green-500 rounded-full">
                Published
              </div>}
             {!isOn&& <div className="p-2 border-2 border-red-500 rounded-full">
                Private
              </div>}
            </td>
            <td className="flex justify-center">
              <div className="flex justify-start w-5/6">
                <div>
                  <img
                    src={thumbnail}
                    alt="img"
                    className="w-16 h-16 rounded-full"
                  />{" "}
                </div>
                <div className="ml-2">
                  {title}
                </div>
              </div>
            </td>
            <td>
              <div className="p-2 inline-block bg-green-300 text-green-700  rounded-full">
                {totalLikes} likes
              </div>{" "}
              <div className="p-2 inline-block bg-red-300 text-red-700  rounded-full">
                49 dislikes
              </div>
            </td>
            <td>
            
              {`${day}/${month}/${year}`} <MdEdit className="inline-block text-2xl ml-2 cursor-pointer" onClick={openEditBox}/>

              {
                !showSpinner?(<RiDeleteBin6Fill onClick={deleteVideo} className="inline-block text-2xl ml-4 cursor-pointer" />):(<Spinner/>)
              }
              
             
            </td>
          </tr>

          {
            editPopVisible&&<EditVideoPopup closeEditBox={closeEditBox} details={details}/>
          }
    </>
  );
}

export default SingleVideoForDashboard;
