import React from "react";
import LetterCard from "../letterCard";
import styles from "./Word.module.scss";

type WordProps = { word: string; correctWord?: string };

const Word = ({ word, correctWord }: WordProps) => {
  const checkLetter = (letter: string, index: number) => {
    const charAt = letter.charAt(0);
    return {
      correctLetter: correctWord?.includes(charAt),
      correctPosition: correctWord?.charAt(index) === letter,
    };
  };
  return (
    <div className={styles.wordWrapper}>
      {word?.split("").map((letter, index) => (
        <LetterCard letter={letter} {...checkLetter(letter, index)} />
      ))}
    </div>
  );
};

export default Word;
