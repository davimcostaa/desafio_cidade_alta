import { LettersContext } from '@/context/Letter';
import React, { useState, useEffect, useContext } from 'react';

const CountdownTimer = () => {
  const initialTime = 5
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const { setError } = useContext(LettersContext);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          setError(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const timePercentage = ((initialTime - timeRemaining) / initialTime) * 100;


  return (
    <div className='w-full'>
      <div className="h-2 w-full bg-orange">
          <div className="h-2 bg-primary" 
              style={{ width: `${timePercentage}%`, transition: 'width 1s linear'}} />
      </div>
    </div>
  );
};

export default CountdownTimer;