import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';

const PrimaryHeader = () => {
  return (
    <div>
    <div className='flex items-center space-x-4 text-white'>
        <h1 className='text-3xl font-bold'>Fuel Assesment</h1>
        <AiOutlineInfoCircle />
    </div>
    </div>
  )
}

export default PrimaryHeader
