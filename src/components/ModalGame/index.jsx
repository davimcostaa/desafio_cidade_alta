import { useState, useCallback, useContext, useEffect } from 'react';
import { LettersContext } from '@/context/Letter';
import { generateArrayOfLetters } from '@/utils/generateLetters';
import Image from 'next/image';
import crown from "../../../public/images/crown.svg";
import LetterBox from './LetterBox';
import Button from '../Button';
import CountdownTimer from '../Timer';

const ModalGame = ({ isOpen, toggleModal }) => {
  const { 
        letters, 
        setLetters, 
        setTypedLetters,
        positionsCorrect,
        setPositionsCorrect,
        error,
        setError
      } = useContext(LettersContext);

  const [lettersGenerated, setLettersGenerated] = useState(false);

  const handleGenerateLetters = () => {
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
        } else {
          setError(true);
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-600 opacity-75" onClick={toggleModal}></div>
      <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-around z-10 w-1/2 h-1/2 relative">
        <Image src={crown} className='absolute -top-4' alt='decoração de coroa' />
        {error ? (
          <div className="flex flex-col items-center gap-10">
            <h2 className="text-white font-bold text-2xl mt-16">Tente novamente!</h2>
            <Button 
                  onClick={handleGenerateLetters}
                  text="Tentar de novo" />
          </div>
        ) : (
          <>
            {positionsCorrect === 4 ? (
              <div className="flex flex-col gap-14 items-center">
                <h1 className="text-orange text-4xl font-semibold">Parabéns!</h1>
                <Button 
                  onClick={handleGenerateLetters}
                  text="Jogar de novo" />
              </div>
              
            ) : (
              <div className="flex flex-col gap-16 items-center">
                <h2 className="text-white font-bold text-2xl ">CLIQUE NA SEQUÊNCIA CORRETA</h2>
                {lettersGenerated ?
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-10 mt-4">
                      {letters.map((letter, index) => (
                        <LetterBox letter={letter} key={index} position={index} />
                      ))}
                    </div>
                    <CountdownTimer />
                  </div>
                  :
                  <Button 
                    onClick={handleGenerateLetters}
                    text="Iniciar" />
                }
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalGame;
