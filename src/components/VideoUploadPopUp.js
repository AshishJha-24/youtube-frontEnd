import downloadIcon from "../downloadImg.jpeg";
import custominput from "../../customInput.css";
import { useState,useRef,useEffect } from "react";
import axios from "axios"
import VideoUploadingStatuus from "./VideoUploadingStatuus";

const VideoUploadPopUp = ({ closeModal ,setReload}) => {
    const fileInputRef = useRef(null);
    const [video, setVideo] = useState("");
    const [videoShow, setvideoShow] = useState("hidden");
    const [hideText, setHideText] = useState("");
    const [textareaHeight, setTextareaHeight] = useState("200px");
    const [uploadingStart,setUploadingStart]=useState(false);
    const [progressComplete, setProgressComplete] = useState("uploading video.....");
    const [size,setSize]=useState(0);
    const abortControllerRef = useRef(null);
    

    const [formDetails,setFormDetails]=useState({video:"",thumbnail:"",title:"",description:"",isPublished:"false"});

   const handleChange=(event)=>{
       const {name,value}=event.target;

       if(value){
        setFormDetails((prev)=>({...prev,[name]:value}))
       }
       console.log(formDetails)
   }

  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

  
  
    const handleFileChange = (event) => {
        const {name}=event.target;
      const file = event.target.files[0];
       
      if (file) {
        setFormDetails((prev)=>({...prev,[name]:file}))
        console.log(event.target.files[0]);
        
   if(name==="video"){
    const videoURL = URL.createObjectURL(file);
    setSize(file.size);
    setvideoShow("");
    setHideText("hidden");
    setVideo(videoURL);
   
   }
       
      }
      console.log(formDetails)
    };
  
    const handleChangeTextArea = (event) => {
        const {name,value}=event.target;
        setFormDetails((prev)=>({...prev,[name]:value}))
      if (event.target.value === "") {
        setTextareaHeight("200px"); // Reset to auto height when text is empty
      } else {
        console.log(event.target.scrollHeight);
        if (event.target.scrollHeight > 200)
          setTextareaHeight(`${event.target.scrollHeight}px`);
      }

      console.log(formDetails)
    };

const uploadVideo=async ()=>{
    console.log("upload Button Clicked")
    const formData= new FormData();
    for(const key in formDetails){
        if (formDetails.hasOwnProperty(key)) {
            formData.append(key, formDetails[key]);
          }
    }
    
    try {

      const CancelToken = axios.CancelToken;
      abortControllerRef.current = CancelToken.source();
      setUploadingStart(true);
      const response = await axios.post("http://localhost:8000/api/v1/video", formData, {
        withCredentials: true,
        cancelToken: abortControllerRef.current.token,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
        
      setProgressComplete("Uploaded Successfully ")
       
        console.log(response.data);
        

    
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Video uploading canceled: " + error.message);
    } else {
      console.error("Error while uploading video: " + error.message);
      setProgressComplete("Server error while uploading Video")
    }
}



}

  
    return (
      <div className="sm:inset-0 top-12 h-full  w-full flex justify-center items-center z-50 absolute  " onClick={(e)=>{
        closeModal();
      }}>
       {!uploadingStart&& <div className="p-4 rounded-lg border-2 border-white shadow-lg  bg-gray-50 dark:bg-gray-900  dark:text-white md:w-1/2 md:h-full h-full w-full overflow-auto " onClick={(e)=>{
                e.stopPropagation();
       }}>
         <div>
          <div className="flex border-b-2 border-white justify-between p-2 items-center b">
            <div>
              <p className="text-3xl">Upload Video</p>
            </div>
            <div className="px-8 py-4 mb-2 font-bold items-center bg-orange-500 text-white rounded ">
              <button onClick={uploadVideo}>Upload</button>
            </div>
          </div>
          <div>
            <div className=" h-full">
              <div
                className={`${hideText} border-2 border-white-500 border-dashed m-4 flex justify-center h-96  `}
              >
                <div className="flex flex-col justify-center items-center mt-8 mb-8 ">
                  <img className="w-36 h-36 " src={downloadIcon} alt="" />
                  <p className="mt-4">Drag and drop video files to upload</p>
                  <p className="mt-4 text-gray-500">
                    Your videos will be private untill you publish them.
                  </p>
                  <div>
                    <button
                      onClick={handleButtonClick}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-blue-700"
                    >
                      Select Video
                    </button>
                    <input
                      type="file"
                      name="video"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="video/*"
                      required
                    />
                  </div>
                </div>
              </div>
  
              <video
                src={video}
                controls
                className={`w-full h-80  mb-4 ${videoShow}`}
              ></video>
            </div>
  
            <div className="mt-4">
              <div className="mb-1">
                <label htmlFor="thumbnail">Thumbnail</label>
              </div>
              <input
              onChange={handleFileChange}
                 name="thumbnail"
                type="file"
                accept="image/*"
                className="custom-file-input thin-border w-full "
              />
            </div>
            <div className="mt-4">
              <div className="mb-1">
                <label htmlFor="Title">Title*</label>
              </div>
              <input type="text" name="title" className="thin-border w-full bg-inherit p-2" onChange={handleChange}/>
            </div>
            <div className="mt-4">
              <div className="mb-1">
                <label htmlFor="isPublished">Publish Or Private :</label>
              </div>
              <select
                onChange={handleChange}
                name="isPublished"
                className="bg-orange-500 thin-border mb-4  p-2"
              >
                <option
                  value="false"
                  className="bg-gray-50 dark:bg-gray-900  dark:text-white"
                >
                  Private
                </option>
                <option
                  value="true"
                  className="bg-gray-50 dark:bg-gray-900  dark:text-white"
                >
                  Publish
                </option>
              </select>
            </div>
  
            <div className="mt-4">
              <div className="mb-1">
                <label htmlFor="description">Description*</label>
              </div>
              <textarea
              name="description"
                onChange={handleChangeTextArea}
                className="w-full placeholder-white overflow-hidden bg-inherit p-4  rounded-md resize-none border-b-2 border-white outline-none thin-border "
                style={{ height: textareaHeight }}
              ></textarea>
            </div>
          </div>
          <button
            onClick={()=>{
                console.log("Cancel button clicked")
                closeModal();
            }}
            className="btn btn-secondary bg-orange-500 px-4 py-2 mt-2"
          >
            Cancel
          </button>
          </div>
        </div>
}

{uploadingStart&&(<VideoUploadingStatuus  progressComplete={progressComplete} closeModal={closeModal} abortControllerRef={abortControllerRef} size={size} setReload={setReload}/>)}
      </div>
    );
  };


  export default VideoUploadPopUp;