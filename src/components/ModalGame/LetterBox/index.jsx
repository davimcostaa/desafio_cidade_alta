import { LettersContext } from '@/context/Letter';
import React, { useContext } from 'react'

const LetterBox = ({letter, position}) => {

  const { positionsCorrect } = useContext(LettersContext);

  return (
    <div className={`p-3 w-[40px] lg:w-[50px] text-center rounded-md font-bold text-2xl ${positionsCorrect >= position ? 'bg-orange text-primary' : 'bg-white'} `}>{letter}</div>
  )
}

export default LetterBox