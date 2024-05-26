import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { CiBookmarkPlus } from "react-icons/ci";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const VideoDetailedPage = () => {
  const { videoId } = useParams();

  const [videoDetails, setVideoDetails] = useState({});
  const commentApi="http://localhost:8000/api/v1/comment/"+videoId;

  const fetchVideo = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/v1/video/" + videoId, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const video = await data.json();

      console.log(video?.data[0]);
      setVideoDetails(video?.data[0]);
      console.log(videoDetails);
    } catch (error) {
      console.log("Error in detailed video" + error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);
  return !videoDetails ? (
    <>
      <h1>Loading.....</h1>
    </>
  ) : (
    <>
      <div className="border-2 border-red-800 lg:w-4/6 ">
        <div className="">
          <video
            src={videoDetails?.videoFile}
            controls
            className="w-full h-96 "
          ></video>
        </div>

        <div>
          <div className="flex justify-between p-4  border-2 border-blue-800  flex-wrap ">
            <div className="lg:mb-0 mb-4  ">
              <p className="font-bold text-xl">{videoDetails?.title}</p>
              <p>30,164 Views ·18 hours ago</p>
            </div>
            <div className="flex border-2 border-white rounded-md  p-2">
              <div className="flex mr-4 cursor-pointer  sm:h-10  ">
               
                <GoThumbsup className="text-3xl " />
                <span className="ml-2 text-xl">222</span>
              </div>
              <div className="flex mr-4 cursor-pointer sm:h-10  ">
           
                <GoThumbsdown className="text-3xl" />
                <span className="ml-2 text-xl">222</span>
              </div>
              <div className="flex text-black cursor-pointer sm:h-10 ">
                <CiBookmarkPlus className="text-3xl text-white font-bold" /> <span className="text-xl font-bold text-white">save </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-4 ">
            <div className="flex items-center">
              <Link to={"/channel/"+videoDetails?.ownerDetails?._id}>
              <img
                src={videoDetails?.ownerDetails?.avtar}
                alt=""
                className="w-20 h-20 mr-3 rounded-full "
              />
              </Link>
              <div>
                <p className="font-bold">
                  {videoDetails?.ownerDetails?.fullName}
                </p>
                <p className="text-gray ">757K Subscribers</p>
              </div>
            </div>
            <div>
              <button className="bg-red-800">Subscribe</button>
            </div>
          </div>

          <div>
            <div className="p-4 ">{videoDetails?.description}</div>
          </div>
        </div>
      <Comment commentfetchApi={commentApi}  commentPostApi={commentApi} heading={"Comment"} placeholder={"Add a comment...."} visibilty="block"/>
      
      </div>
    </>
  );
};
