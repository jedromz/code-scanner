import React, { useState, useRef, useEffect } from 'react';
import PrimaryHeader from '../components/PrimaryHeader';
import SecondaryHeader from '../components/SecondaryHeader';
import MacrosBar from '../components/MacrosBar';
import ScanButton from '../components/ScanButton';
import Headers from '../components/Headers';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import Webcam from "react-webcam";

const MainBarcodeScannerPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [lastScanned, setLastScanned] = useState(null);
  const [error, setError] = useState(null);  // Error state

  const webcamRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    if (cameraOn && webcamRef.current) {
      const video = webcamRef.current.video;
      codeReader.decodeFromVideoDevice(undefined, video, async (result, err) => {
        if (result && result.text !== lastScanned) {
          console.log(result.text);
          setLastScanned(result.text);
          const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${result.text}`);
          if (!response.ok) {  // If the response status is not ok
            setError('Product not found');  // Set the error state
            return;
          }
          const data = await response.json();
          const product = data.product || {};
          const nutriments = product.nutriments || {};
          setProtein(nutriments.proteins_100g || 0);
          setCarbs(nutriments.carbohydrates_100g || 0);
          setFat(nutriments.fat_100g || 0);
          setCalories(nutriments['energy-kcal_100g'] || 0);
          setError(null);  // Reset the error state after a successful scan
        }
        if (err && !(err instanceof NotFoundException)) {
          console.log(err);
        }
      });

      return () => {
        codeReader.reset();
      }
    }
  }, [cameraOn, lastScanned]);

  const handleClick = () => {
    setCameraOn(true);
  };

  const handleClose = () => {
    setCameraOn(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black'>
      <div>
        <Headers />
        <MacrosBar protein={protein} carbs={carbs} fat={fat} calories={calories} />
        <div className='flex flex-col items-center w-full md:max-w-md'>
          <div className={`flex flex-col ${cameraOn ? 'items-end justify-center min-h-screen' : 'items-center'}`}>
            {cameraOn && <Webcam className="viewport" ref={webcamRef} />}
            {cameraOn ? 
              <button onClick={handleClose} className='w-full flex items-center space-x-2 bg-black text-white border-blue-500 border-2 px-4 py-2 rounded'>Close Scanner</button> :
              <ScanButton onClick={handleClick} />
            }
          </div>
          {error && <div className="mt-4 text-red-500">{error}</div>}  {/* Display the error message if there is an error */}
        </div>
      </div>
    </div>
  );
}

export default MainBarcodeScannerPage;
