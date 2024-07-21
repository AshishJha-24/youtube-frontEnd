import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className='flex items-center mb-2 '>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-orange-500 h-4 rounded-full flex justify-end items-center"
        style={{ width: `${progress}%` }}
      ><p className='text-black mr-2 font-bold '>{progress}%</p></div>
       
    </div>
   
    </div>
  );
};

export default ProgressBar;