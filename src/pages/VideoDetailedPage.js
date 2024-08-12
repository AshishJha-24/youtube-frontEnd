import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { CiBookmarkPlus } from "react-icons/ci";
import Comment from "../components/Comment.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

export const VideoDetailedPage = () => {
  const { videoId } = useParams();

  const [videoDetails, setVideoDetails] = useState({});
  const [videouploadedtime, setVideouploadedtime] = useState("")
  const [isVideoLiked,setIsVideoLiked] =useState("");
  const [subscribeBtnStyle,setSubscribeBtnStyle]=useState({bgColor:"bg-red-900",text:"Subscribe"});
  const[reloadAfterClickOnSubscribeBtn,setReloadAfterClickOnSubscribeBtn]=useState(true);

  const commentApi=process.env.API_ENTRYPOINT+"/api/v1/comment/"+videoId;
  const toggleLikecommentApi=process.env.API_ENTRYPOINT+"/api/v1/likes/toggle/c/";
  const commentUpdateApi=process.env.API_ENTRYPOINT+"/api/v1/comment/c/";
  const commentDeleteApi=process.env.API_ENTRYPOINT+"/api/v1/comment/c/"


  
  const data=   useSelector((state)=>state.user)
  console.log(data);


  const toggleLiked= async ()=>{
        const data =await fetch(process.env.API_ENTRYPOINT+"/api/v1/likes/toggle/v/"+videoId, 
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
        setIsVideoLiked("text-blue-900")
       }else{
        setIsVideoLiked("text-white")
       }
        console.log(liked);
  }


  const fetchVideo = async () => {
    try {
      const data = await fetch(process.env.API_ENTRYPOINT+"/api/v1/video/" + videoId, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const video = await data.json();

      console.log(video?.data[0]);
      if(video.data[0].isSubscribed){
        setSubscribeBtnStyle({bgColor:"",text:"Subscribed"})
      }
      const uploadedAgo = timeAgo(video?.data[0]?.createdAt);
      if(video?.data[0]?.isLiked){
        setIsVideoLiked("text-blue-900")
      }
      console.log(isVideoLiked)
      setVideouploadedtime(uploadedAgo);
      setVideoDetails(video?.data[0]);
      
      console.log(videoDetails);
    } catch (error) {
      console.log("Error in detailed video" + error);
    }
  };



  const toggleSubscribe=async ()=>{
    try {
      const response = await fetch(process.env.API_ENTRYPOINT+"/api/v1/subscriptions/c/"+videoDetails?.ownerDetails?._id,{
        method:"POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      const subscriptionDetail=await response.json();
      console.log(subscriptionDetail)
      if(subscriptionDetail.data.subscribed){
        setSubscribeBtnStyle({bgColor:"",text:"Subscribed"})
      }else{
        setSubscribeBtnStyle({bgColor:"bg-red-900",text:"Subscribe"})
      }
      setReloadAfterClickOnSubscribeBtn(!reloadAfterClickOnSubscribeBtn);
     
    } catch (error) {
      console.log("error while subscribing channel"+error);
    }
  }



  useEffect(() => {
    fetchVideo();
     
     
  }, [isVideoLiked,reloadAfterClickOnSubscribeBtn]);
  return !videoDetails ? (
    <>
      <h1>Loading.....</h1>
    </>
  ) : (
    <>
      <div className="lg:w-4/6 ">
        <div className="">
          <video
            src={videoDetails?.videoFile}
            className="w-full h-96 "
            autoPlay
            controls
          ></video>
        </div>
        <div>

        <div className="border-2 border-white mb-2 rounded-2xl">
          <div className="flex justify-between p-4 flex-wrap ">
            <div className="lg:mb-0 mb-4  ">
              <p className="font-bold text-xl">{videoDetails?.title}</p>
              <p>{videoDetails?.views} Views · {videouploadedtime}</p>
            </div>
            <div className="flex border-2 border-white rounded-md p-2 ">
              <div className="flex mr-4 cursor-pointer  sm:h-10   "  onClick={toggleLiked}>
               
                <GoThumbsup className={`${isVideoLiked} text-3xl`} />
                <span className="ml-2 text-xl">{videoDetails?.likes}</span>
              </div>
              <div className="flex mr-4 cursor-pointer sm:h-10   ">
           
                <GoThumbsdown className="text-3xl" />
                <span className="ml-2 text-xl"></span>
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
                <p className="text-gray ">{videoDetails?.subscriberCount} Subscribers</p>
              </div>
            </div>
   {  data.user._id!==videoDetails?.ownerDetails?._id?(<div >
            <button className={` ${subscribeBtnStyle.bgColor} w-24 rounded-md p-2 border-2 border-white `} onClick={toggleSubscribe}>
            {subscribeBtnStyle.text}
            </button>
            </div>):""
               }
          </div>

          <div>
            <p className="p-2 text-bold text-2xl">Description...</p>
            <hr className="ml-2 mr-2"/>
            <div className="p-4 ">{videoDetails?.description}</div>
          </div>
          </div>
       
       </div>
      <Comment commentfetchApi={commentApi}  commentPostApi={commentApi} heading={"Comment"} placeholder={"Add a comment...."} visibilty="block" toggleLike={toggleLikecommentApi} videoOwner={videoDetails?.ownerDetails?._id} updateApi={commentUpdateApi} deleteApi={commentDeleteApi}/>
      
      </div>
    </>
  );
};
