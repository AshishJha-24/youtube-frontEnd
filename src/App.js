import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Registration from "./components/Registration"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoDetailedPage } from "./components/VideoDetailedPage";
import HomePageDefaultVideo from "./components/HomePageDefaultVideo.js";
import Channel from "./components/Channel.js";
import Comment from "./components/Comment.js";
import { VideosForProfile } from "./components/HomePageDefaultVideo.js";
import Tweet from "./components/Tweet.js";
import SearchVideoPage from "./components/SearchVideoPage.js";
import LikedVideos from "./components/LikedVideos.js";
import HistoryVideo from "./components/HistoryVideo.js";
import SubscribedList from "./components/SubscribedList.js";
import SubscriberList from "./components/SubscriberList.js";
import Dashboard from "./components/Dashboard.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStore } from "./store/userSlice.js";
import { useNavigate } from "react-router-dom";


function Root() {

  const VideoofProfile=VideosForProfile(HomePageDefaultVideo);
  const TweetComponent= Tweet(Comment);
  const dispatcher=useDispatch();
  const navigate = useNavigate();
  const fetchUser= async()=>{
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/current-user",{
          credentials:"include",
          headers:{
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
        })

        console.log(response);

        if(response.status===401){
          navigate("/login")
        }else{
          const data = await response?.json();
          dispatcher(updateStore(data.data));
        }
        

       
      } catch (error) {
        console.log(error);
       console.log("eror "+error);
      }
        
      }
        
  
  useEffect(()=>{
    fetchUser();
  },[])
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route path="/" element={<HomePageDefaultVideo/>}/>
        <Route path="/user/dashboard" element={<Dashboard/>}/>
        <Route path="/results" element={<SearchVideoPage/>}/>
        <Route path="/liked-videos" element={<LikedVideos/>}/>
        <Route path="/history" element={<HistoryVideo/>}/>
        <Route path="/subscription" element={<SubscribedList/>}/>
        <Route path="video/:videoId" element ={<VideoDetailedPage/>}/>
        <Route path="channel/:userId" element ={<Channel/>}>
          <Route path="/channel/:userId" element={< VideoofProfile /> }/>
          <Route path="playlist" element={<HomePageDefaultVideo/> }/>
          <Route path="tweet" element={<TweetComponent/> }/>
          <Route path="subscriber" element={<SubscriberList/> }/>
        </Route>
             
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
       
      </Routes>
   
  );
}

 function App(){
  return (
        <Router>
          <Root/>
        </Router>
  )
}

export default App
