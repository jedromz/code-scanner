import React from 'react';

const MacroSquare = ({ title, value }) => {
  return (
    <div className='w-32 h-32 p-4 m-2 bg-gray-500 rounded-lg flex flex-col justify-center items-center'>
      <h2 className='font-bold text-xl'>{title}</h2>
      <p className='text-lg'>{value}</p>
    </div>
  );
}

export default MacroSquare;
