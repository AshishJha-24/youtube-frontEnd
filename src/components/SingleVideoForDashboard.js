import React from "react";
import ToggleButton from "./ToggleButton";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

function SingleVideoForDashboard({details}) {
  console.log(details);
  const [isOn, setIsOn] = useState(details?.isPublished);
  const {day,month,year}=details.createdAt;
  return (
    <>
     <tr className="w-full border-2 border-white ">
            <td>
                <ToggleButton videoId={details?._id} ispublished={details?.isPublished} setIsOn={setIsOn} isOn={isOn}/>
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
              <div className="flex items-center">
                <div>
                  <img
                    src={details?.thumbnail}
                    alt="img"
                    className="w-16 h-16 rounded-full"
                  />{" "}
                </div>
                <div className="ml-2">
                  {details?.title}
                </div>
              </div>
            </td>
            <td>
              <div className="p-2 inline-block bg-green-300 text-green-700  rounded-full">
                {details?.totalLikes} likes
              </div>{" "}
              <div className="p-2 inline-block bg-red-300 text-red-700  rounded-full">
                49 dislikes
              </div>
            </td>
            <td>
            
              {`${day}/${month}/${year}`} <MdEdit className="inline-block text-2xl ml-2 cursor-pointer" />
              <RiDeleteBin6Fill className="inline-block text-2xl ml-4 cursor-pointer" />
             
            </td>
          </tr>
    </>
  );
}

export default SingleVideoForDashboard;
