import React from 'react'
import { useState } from 'react';

function EditVideoPopup({closeEditBox,details}) {
    const [textareaHeight, setTextareaHeight] = useState("200px");
    const {_id,title,description} =details;
  return (
    <div className='top-0 bottom-0 right-0 left-0 w-full h-full border-2 border-yellow-500 absolute  z-50 flex justify-center items-center  ' onClick={closeEditBox}>

 <div className="p-4 rounded-lg border-2 border-white shadow-lg  bg-gray-50 dark:bg-gray-900  dark:text-white md:w-1/2  w-full overflow-auto " onClick={(e)=>{
                e.stopPropagation();
       }}>
         <div>
         
          <div>
            <div className="mt-4">
              <div className="mb-1 text-start">
                <label htmlFor="thumbnail">Thumbnail</label>
              </div>
              <input
              onChange={()=>{
                // handleFileChange
                console.log("hello")
              }}
                 name="thumbnail"
                type="file"
                accept="image/*"
                className="custom-file-input thin-border w-full "
              />
            </div>
            <div className="mt-4">
              <div className="mb-1 text-start">
                <label htmlFor="Title">Title*</label>
              </div>
              <input value={title} type="text" name="title" className="thin-border w-full bg-inherit p-2" onChange={()=>{
                // handleChange
                console.log("hello")
              }}/>
            </div>
            <div className="mt-4">
              <div className="mb-1 text-start">
                <label htmlFor="description">Description*</label>
              </div>
              <textarea
              name="description"
              value={description}
                onChange={()=>{
                    // handleChangeTextArea
                    console.log("helllo")
                }}
                className="w-full placeholder-white overflow-hidden bg-inherit p-4  rounded-md resize-none border-b-2 border-white outline-none thin-border "
                style={{ height: textareaHeight }}
              ></textarea>
            </div>
          </div>
          <button
            onClick={()=>{
                console.log("Cancel button clicked")
                closeEditBox();
            }}
            className="btn btn-secondary bg-orange-500 px-4 py-2 mt-2"
          >
            Cancel
          </button>
          </div>
        </div>
          </div>
      

  )
}

export default EditVideoPopup
 