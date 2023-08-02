import React from 'react'
import { FaBarcode } from 'react-icons/fa';

const ScanButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='flex items-center space-x-2 bg-black text-white border-blue-500 border-2 px-4 py-2 rounded'>
      <FaBarcode />
      <span>Scan the barcode</span>
    </button>
  )
}

export default ScanButton
