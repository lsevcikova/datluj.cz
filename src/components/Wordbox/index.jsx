import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake}) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false); // Stav pro zjištění chyby

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (!active || lettersLeft === '') {
        // slovo neni aktivni nebo je kompletni
        return;
      }

      const userInput = event.key;
      const currentLetter = lettersLeft[0];

      if (userInput === currentLetter) {
        const newLettersLeft = lettersLeft.slice(1); // odebere prvni pismeno
        setLettersLeft(newLettersLeft);
        setMistake(false);
      } else {
        setMistake(true);
        onMistake();
      }
    };

    if (active) {
      document.addEventListener('keyup', handleKeyUp);
    }

    // pripojeni posluchače události keyUp na dokumentu
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      if (active) {
        document.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [lettersLeft, onFinish, active, onMistake]);

  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>{lettersLeft}</div>
  );
};

export default Wordbox;

