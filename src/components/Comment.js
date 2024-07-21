import React, { useCallback, useEffect } from "react";
import SingleComment from "./SingleComment";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import Spinner from "./Spinner"
function Comment({ commentfetchApi, commentPostApi, heading, placeholder,visibilty, toggleLike,videoOwner,updateApi,deleteApi }) {
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("60px");
  const [submitvisbility, setSubmitvisibility] = useState("none");
  const [loading, setLoading]=useState(true);
  const [comments, setComments] = useState([]);
  const [hasmoreData, sethasmoreData]=useState(true);
  const [page, setPage] =  useState(1);


  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value === "") {
      setTextareaHeight("60px"); // Reset to auto height when text is empty
    } else {
      setTextareaHeight(`${event.target.scrollHeight}px`);
    }
  };

  const fetchComments = async (pageNumber) => {
    try {
     
      const commentsData =await axios.get(commentfetchApi+`?page=${pageNumber}`,{
        withCredentials:true
      })
      console.log(commentsData.data);
      if(commentsData.data.data.length===0){
        console.log("Data exhausted");
        sethasmoreData(false);
      }else if(page===1){
        setComments(commentsData?.data.data);
        sethasmoreData(true);
      }else{
        setComments((prev)=>[...prev,...commentsData?.data.data]);
        sethasmoreData(true);
        console.log(comments);
      }
      console.log(page);
     
      setPage(prev=> prev+1); 
     
    } catch (error) {
      console.log("error while fetching comments" + error);
    }finally{
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      try {
        const response = await fetch(commentPostApi, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ content: text }),
        });

        const newComment = await response.json();
       
      console.log(newComment);
        setText("");
        setSubmitvisibility("none");
        setTextareaHeight("60px");
        setPage(1)
      } catch (error) {
        console.log("failed to comment" + error);
      }
    }
  };

  const handleIntersection =(entries) => {
   
    const target = entries[0];
    console.log(hasmoreData);
    console.log(page);
    
    if (target.isIntersecting && hasmoreData) {
      fetchComments(page); 
    }else{
      return;
    }
  };

  

  useEffect(() => {
    console.log("page number::: "+page);
    if(loading || page===1){
      fetchComments(1);
    }else{
      const observer = new IntersectionObserver(handleIntersection,{
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 1.0 // Fully visible
      })
      // Observe a target element (e.g., the last item in the list)
      const targetElement = document.getElementById('intersection-target');
      if (targetElement) {
        observer.observe(targetElement);
      }

    
    // Cleanup
    return () => observer.disconnect(); 
    }

  }, [page]);




  return (
    <>
    <div className="border-2 border-white p-4 rounded-2xl">
      <div className=" text-3xl">
        {comments.length} {heading}{" "}
      </div>
      <div className="mt-4" style={{
              display: visibilty,
            }}>
        <div className=" ">
          <textarea
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            className="w-full placeholder-white overflow-hidden bg-black p-4  rounded-md resize-none border-b-2 border-white outline-none"
            style={{ height: textareaHeight }}
            onClick={() => {
              setSubmitvisibility("flex");
            }}
          ></textarea>
          <div
            className=" justify-end"
            style={{
              display: submitvisbility,
            }}
          >
            <div className="mr-2 ">
              <button
                className="bg-orange-500 p-3 rounded-lg"
                onClick={() => {
                  setText("");
                  setSubmitvisibility("none");
                  setTextareaHeight("60px");
                }}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="bg-orange-500 p-3 rounded-lg"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {comments.map((comment) => (
        <SingleComment key={comment._id} commentDetails={comment} toggleLike={toggleLike} videoOwner={videoOwner} setPage={setPage} updateApi={updateApi} deleteApi={deleteApi} />
      ))}
       <div id="intersection-target" style={{ height: '10px' }} className="flex justify-center m-4 "> {hasmoreData?<Spinner/>:(<h1>{comments.length===0?<span>Write first Comment </span>:<span> No more Comment</span> }</h1>)}  </div> {/* Target element for intersection observer */}
    </div>
  
    

    </>
  );
}

export default Comment;
