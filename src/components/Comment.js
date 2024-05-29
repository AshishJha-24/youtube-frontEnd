import React, { useEffect } from "react";
import SingleComment from "./SingleComment";
import { useState, useEffect } from "react";
function Comment({ commentfetchApi, commentPostApi, heading, placeholder,visibilty, toggleLike }) {
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("60px");
  const [submitvisbility, setSubmitvisibility] = useState("none");

  const [comments, setComments] = useState([]);
  const[newCommentVisibility ,setnewCommentVisibility]=useState(false)

  

  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value === "") {
      setTextareaHeight("60px"); // Reset to auto height when text is empty
    } else {
      setTextareaHeight(`${event.target.scrollHeight}px`);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await fetch(commentfetchApi, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const comments = await data.json();
      setComments(comments?.data);
      console.log(comments);
    } catch (error) {
      console.log("error while fetching comments" + error);
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
        setnewCommentVisibility(!newCommentVisibility)
      } catch (error) {
        console.log("failed to comment" + error);
      }
    }
  };

  useEffect(() => {

    console.log("comment Fetched");

    fetchComments();
    

  }, [newCommentVisibility]);

  return (
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
        <SingleComment key={comment._id} commentDetails={comment} toggleLike={toggleLike} />
      ))}
    </div>
  );
}

export default Comment;
