import React, { useState } from "react";
import VideoUploadPopUp from "./VideoUploadPopUp";


const UploadVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className=" ">
        <button
          onClick={openModal}
          className="btn btn-primary bg-orange-500 p-4  rounded-2xl"
        >
          + Upload Video
        </button>
        {isModalOpen && <VideoUploadPopUp closeModal={closeModal} />}
      </div>
    </>
  );
};


export default UploadVideo;
