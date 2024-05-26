import React from "react"

 function  ListView (){
    return(
        <>

       <div className="flex flex-wrap ">
        <div  className=' sm:w-2/6 relative '>
        <img src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  className=" mt-4" />
        <p className="bg-black absolute bottom-0 right-0  text-white p-1">20:45</p>
        </div>

        <div className=" sm:w-3/6 sm:ml-10 sm:mt-10  mt-5 mb-10  ">
        <p className="font-bold">JavaScript Fundamentals: Variables and Data Types</p>
        <p className="pt-4 ">10.3k Views · 44 minutes ago </p> 
            <div className="flex items-center pt-4">
            <img src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  className='w-14 h-14 rounded-full  mr-4 '/>
            <p className="font-bold">Code Master</p>
            </div>

                <p className="pt-4">Learn the basics of JavaScript, including variables, data types, and how to use them in your programs.</p>

        </div>

       </div>
        </>
    )
}


export default ListView;






