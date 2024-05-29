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

function App() {

  const VideoofProfile=VideosForProfile(HomePageDefaultVideo);
  const TweetComponent= Tweet(Comment);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route path="/" element={<HomePageDefaultVideo/>}/>
        <Route path="/results" element={<SearchVideoPage/>}/>
        <Route path="/liked-videos" element={<LikedVideos/>}/>
        <Route path="/history" element={<HistoryVideo/>}/>
        <Route path="video/:videoId" element ={<VideoDetailedPage/>}/>
        <Route path="channel/:userId" element ={<Channel/>}>
          <Route path="/channel/:userId" element={< VideoofProfile /> }/>
          <Route path="playlist" element={<HomePageDefaultVideo/> }/>
          <Route path="tweet" element={<TweetComponent/> }/>
          <Route path="subscribed" element={<HomePageDefaultVideo/> }/>
        </Route>
             
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
       
      </Routes>
    </Router>
  );
}

export default App
