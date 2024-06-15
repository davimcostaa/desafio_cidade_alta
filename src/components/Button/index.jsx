import Image from 'next/image';
import React from 'react'
import buttonDecoration from "/public/images/button-decoration.svg";

const Button = ({onClick, text}) => {
  return (
    <button className="bg-blue py-1.5 px-4 w-[200px] relative text-white font-bold rounded-md tracking-widest hover:brightness-105">
      <Image src={buttonDecoration} onClick={onClick}  className="absolute w-full h-[50px] -left-0.5 -top-2" />
      {text}
    </button>  
  )
}

export default Button