import downloadIcon from "../downloadImg.jpeg";
import custominput from "../../customInput.css";
import { useState,useRef } from "react";

const VideoUploadPopUp = ({ closeModal }) => {
    const fileInputRef = useRef(null);
    const [video, setVideo] = useState("");
    const [videoShow, setvideoShow] = useState("hidden");
    const [hideText, setHideText] = useState("");
    const [textareaHeight, setTextareaHeight] = useState("200px");

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

let controller;
const uploadVideo=async ()=>{
    console.log("upload Button Clicked")
    const formData= new FormData();
    for(const key in formDetails){
        if (formDetails.hasOwnProperty(key)) {
            formData.append(key, formDetails[key]);
          }
    }
    try {

         controller = new AbortController();
        const signal=controller.signal;
        const response = await fetch("http://localhost:8000/api/v1/video",{
            method: 'POST',
            body: formData,
            credentials:"include",
            signal
          
        })

        const data = await response.json();
        console.log(data);
        closeModal();

    
  } catch (error) {
    if(error.name='AbortError'){
        console.log("video uploading canceled"+error)
    }
    console.log("error while uploading video ::"+error);
  }
}



  
    return (
      <div className="sm:inset-0 top-12 border-green-500 flex justify-center items-center z-50 absolute">
        <div className="p-4 rounded-lg border-2 border-white shadow-lg  bg-gray-50 dark:bg-gray-900  dark:text-white md:w-1/2 md:h-full w-full overflow-auto ">
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
                if(controller){
                    controller.abort();
                }
                closeModal();
            }}
            className="btn btn-secondary bg-orange-500 px-4 py-2 mt-2"
          >
            Cancel
          </button>
          <div></div>
        </div>
      </div>
    );
  };


  export default VideoUploadPopUp;