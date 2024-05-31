import React from 'react'
import { Link } from 'react-router-dom';

function SingleSubscriber({data}) {
    console.log(data);
  return (
    <div className='flex w-full justify-between mb-4'>
     <div className='flex'>
        <div>
        <Link to={"/channel/"+data._id}>
            <img src={data.avtar} alt="" className='w-20 h-20 rounded-full ' />
            </Link>
        </div>
        <div className='m-2'>
            <p>{data.fullName}</p>
            <p>20K Subscribers</p>
        </div>
    </div> 
     <div>
       <button className='border-2 border-white  rounded-md p-4'>Subscribed</button>
     </div>
    </div>
  )
}

export default SingleSubscriber
