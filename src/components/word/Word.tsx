import React from "react";
import LetterCard from "../letterCard";
import styles from "./Word.module.scss";

type WordProps = { word: string; correctWord?: string; submitted?: boolean };

const Word = ({ word, correctWord, submitted }: WordProps) => {
  const checkLetter = (letter: string, index: number) => {
    const charAt = letter.charAt(0);
    if (correctWord?.charAt(index) === letter) return "correctPosition";
    if (correctWord?.includes(charAt)) return "correctLetter";
    if (submitted) return "wrongLetter";
    return "activeGuess";
  };
  return (
    <div className={styles.wordWrapper}>
      {word?.split("").map((letter, index) => (
        <LetterCard letter={letter} state={checkLetter(letter, index)} />
      ))}
    </div>
  );
};

export default Word;
