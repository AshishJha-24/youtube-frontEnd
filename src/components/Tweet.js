import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';


const Tweet = (Comment)=>{
    return(props)=>{
         const data= useOutletContext();
         console.log(data);
         console.log(process.env.API_ENTRYPOINT)
         tweetfetchApi=process.env.API_ENTRYPOINT+"/api/v1/tweets/user/"+data.userId;
         console.log(tweetfetchApi)
         tweetPostApi=process.env.API_ENTRYPOINT+"/api/v1/tweets";
         toggletweetLike=process.env.API_ENTRYPOINT+"/api/v1/likes/toggle/t/";
         tweetUpdateApi=process.env.API_ENTRYPOINT+"/api/v1/tweets/";
         tweetDeleteApi=process.env.API_ENTRYPOINT+"/api/v1/tweets/";

         const Currentuser=useSelector((state)=>state.user)
   
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