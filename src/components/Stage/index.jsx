import React, { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const handleFinish = () => {
    // odstrani prvni slovo ze seznamu
    const newWords = [...words];
    newWords.shift();

    // nove slovo a pridani na konec seznamu
    const newWord = generateWord(6);
    newWords.push(newWord);

    setWords(newWords);
  };

  const handleMistake = () => {
    setMistakes(mistakes + 1); // Zvýši počet chyb o jedna
  };

  useEffect(() => {
    const initialWords = Array.from({ length: 3 }, () => generateWord(6));
    setWords(initialWords);
  }, []);

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) => <Wordbox word={word} key={index} active={index === 0} onFinish={handleFinish} onMistake={handleMistake} />)}
      </div>
    </div>
  );
};

export default Stage;
