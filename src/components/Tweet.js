import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';


const Tweet = (Comment)=>{
    return(props)=>{
         const data= useOutletContext();
         tweetfetchApi="http://localhost:8000/api/v1/tweets/user/"+data.userId;
         tweetPostApi="http://localhost:8000/api/v1/tweets";
         toggletweetLike="http://localhost:8000/api/v1/likes/toggle/t/";
         tweetUpdateApi="http://localhost:8000/api/v1/tweets/";
         tweetDeleteApi="http://localhost:8000/api/v1/tweets/";

         const Currentuser=useSelector((state)=>state.user)
         console.log(Currentuser)

         console.log(data);
         let visibiltyoftweetBox="none"
         if(Currentuser?.user?._id===data.userId){
            console.log(Currentuser?.user?._id +" "+data.userId )
            visibiltyoftweetBox="block"
         }

        return(
            <Comment commentfetchApi={tweetfetchApi} commentPostApi={tweetPostApi}  placeholder={"Add a tweet...."} heading={"Tweets"} visibilty={visibiltyoftweetBox} toggleLike={toggletweetLike}
            updateApi={tweetUpdateApi}
            deleteApi={tweetDeleteApi}
             />
        )
    }
}

export default Tweet;