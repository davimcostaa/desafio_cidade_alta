"use client";

import React, { createContext, useState } from 'react';

const LettersContext = createContext();

const LettersProvider = ({ children }) => {
  const [letters, setLetters] = useState([]);
  const [typedLetters, setTypedLetters] = useState([]);
  const [positionsCorrect, setPositionsCorrect] = useState();
  const [error, setError] = useState(false);

  return (
    <LettersContext.Provider value={{letters, 
            setLetters, 
            typedLetters, 
            setTypedLetters,
            positionsCorrect,
            setPositionsCorrect,
            error,
            setError,
            }}>
      {children}
    </LettersContext.Provider>
  );
};

export { LettersContext, LettersProvider };