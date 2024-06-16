import { useState, useContext, useEffect } from 'react';
import { LettersContext } from '@/context/Letter';
import { generateArrayOfLetters } from '@/utils/generateLetters';
import Image from 'next/image';
import crown from "/public/images/crown.svg";
import LetterBox from './LetterBox';
import Button from '../Button';
import CountdownTimer from '../Timer';
import useSound from 'use-sound';
import { motion } from 'framer-motion';

import { transition1 } from '../../transitions/transitions';

const ModalGame = ({ isOpen, toggleModal }) => {

  const [correctSound] = useSound('/sounds/correct.mp3');
  const [wrongSound] = useSound('/sounds/wrong.mp3');

  const { 
        letters, 
        setLetters, 
        setTypedLetters,
        positionsCorrect,
        setPositionsCorrect,
        error,
        setError,
      } = useContext(LettersContext);

  const [lettersGenerated, setLettersGenerated] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const handleGenerateLetters = () => {
    setTimerKey(prevKey => prevKey + 1); 
    setLettersGenerated(false);
    setLetters(generateArrayOfLetters());
    setError(false);
    setTypedLetters([]);
    setLettersGenerated(true);
    setPositionsCorrect(-4);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!lettersGenerated || !event.key.match(/[a-z]/i)) return;

      setTypedLetters(prevTypedLetters => {
        const newTypedLetters = [...prevTypedLetters, event.key];
        const currentPosition = newTypedLetters.length - 1;

        if (currentPosition >= 5) {
          window.removeEventListener('keydown', handleKeyDown);
          return newTypedLetters;
        }

        if (letters[currentPosition].toLowerCase() === event.key.toLowerCase()) {
          setPositionsCorrect(currentPosition);
          correctSound();
        } else {
          setError(true);
          wrongSound();
        }
        
        return newTypedLetters;
      });
    };

    if (lettersGenerated) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lettersGenerated, letters, setTypedLetters]);

  if (!isOpen) return null;

  return (
    <motion.div 
      animate={{opacity: 1, y: 0}} 
      exit={{opacity: 0, y: '100%'}}
      transition={transition1}
      className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-600 opacity-75" onClick={toggleModal}></div>
      <motion.div 
          initial={{opacity: 0, y: '100%'}} 
          animate={{opacity: 1, y: 0}} 
          exit={{opacity: 0, y: '100%'}}
          transition={transition1}
          className="bg-primary p-6 rounded-lg shadow-lg 
              flex flex-col items-center justify-around z-10 lg:w-1/2 lg:h-1/2 h-3/6 m-2 relative">
        <Image src={crown} className='absolute -top-4' alt='decoração de coroa' />
        {error ? (
          <motion.div 
            initial={{ scale: 0, y: -50 }} 
            animate={{ scale: 1, y: 0 }} 
            transition={{ duration: 0.5, type: 'keyframes' }}
            className="flex flex-col items-center gap-10">
            <h2 className="text-white font-bold text-2xl mt-16">Tente novamente!</h2>
            <Button 
                  onClick={handleGenerateLetters}
                  text="Tentar de novo" />
          </motion.div>
        ) : (
          <>
            {positionsCorrect === 4 ? (
              <motion.div 
                  initial={{ scale: 0, y: -50 }} 
                  animate={{ scale: 1, y: 0 }} 
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="flex flex-col gap-14 items-center">
                <h1 className="text-orange text-4xl font-semibold">Parabéns!</h1>
                <Button 
                  onClick={handleGenerateLetters}
                  text="Jogar de novo" />
              </motion.div>
              
            ) : (
              <div className="flex flex-col gap-8 items-center">
                <h2 className="text-white font-bold text-2xl mt-5 text-center">CLIQUE NA SEQUÊNCIA CORRETA</h2>
                {lettersGenerated ?
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-10 mt-4">
                      {letters.map((letter, index) => (
                        <LetterBox letter={letter} key={index} position={index} />
                      ))}
                    </div>
                    <CountdownTimer key={timerKey} />
                    <Button 
                      onClick={handleGenerateLetters}
                      text="Reiniciar" />
                  </div>
                  :
                  <>
                    <Button 
                      onClick={handleGenerateLetters}
                      text="Iniciar" /> 
                  </>  
                }
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModalGame;
