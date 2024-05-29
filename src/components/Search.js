import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../logo.jpeg";
import { useNavigate } from "react-router-dom";

function Search() {
  const data = useSelector((state) => state.user);
  const [visibilityloggedIn,setVisibilityloggedIn]=useState("flex");
  const [visibilityuser,setUserVisibility]=useState("block");
  const [searachData,setSearchData] =useState("");
  const navigate = useNavigate();


 useEffect(()=>{
      if(data){
        setVisibilityloggedIn("none")
      }else{
        setUserVisibility("none")
      }
 },[])

  return (
    <div className="flex sm:justify-between  mb-4 p-2 items-center fixed top-0 w-full z-10  bg-gray-900  border-2 border-white ">
      <div className="w-10  h-10">
        <img src={logo} alt="" />
      </div>
      <div>
        <input
          type="text"
          name="search"
          value={searachData}
          placeholder="Search "
          className=' border-2 border-white placeholder:text-slate-400 "bg-gray-50 dark:bg-gray-900  p-4 w-96 text-white h-10 '
          onChange={(e)=>{
           e.preventDefault();
           setSearchData(e.target.value);
          
          }}
        />
        <button className="ml-2 bg-white text-black p-2 rounded-md " onClick={()=>{
        
          if(searachData){
            navigate(`/results?query=${searachData}`);
          }else{
            navigate("/")
          }
          setSearchData("")
        }}>search</button>
      </div>
      <div>
        <div className=" items-start flex-row" style={{
          display:visibilityloggedIn}} >
          <div className="bg-orange-500 m-2 ">
            <Link to="/login">
              <button className="p-2">logIn</button>{" "}
            </Link>
          </div>
          <div className="bg-orange-500 m-2  ">
            <Link to="/register">
              {" "}
              <button className="p-2">Sign Up </button>
            </Link>
          </div>
        </div>

        <div className="border-2  border-white rounded-full" style={{
          display:visibilityuser
        }}>
          <Link to={"/channel/"+data?.user?._id}>
          <img
            src={data?.user?.avtar}
            alt=""
            className=" h-16 w-16  rounded-full"
          />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Search;
