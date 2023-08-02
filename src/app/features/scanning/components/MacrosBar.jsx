import React from 'react';
import MacroSquare from './MacroSquare';

const MacrosBar = ({ protein, carbs, fat, calories }) => {
  return (
    <div className='flex flex-wrap justify-center'>
      <MacroSquare title='Protein' value={`${protein}g`} />
      <MacroSquare title='Carbs' value={`${carbs}g`} />
      <MacroSquare title='Fat' value={`${fat}g`} />
      <MacroSquare title='Calories' value={calories} />
    </div>
  )
}

export default MacrosBar;
