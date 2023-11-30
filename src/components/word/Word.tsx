import React from "react";
import LetterCard from "../letterCard";
import { LetterState } from "../letterCard/LetterCard";
import styles from "./Word.module.scss";

type WordProps = {
  word?: string;
  correctWord?: string;
  submitted?: boolean;
  empty?: boolean;
};

export const getLetterStates = (guess: string, correctWord = "") => {
  const guessLetters = guess.split("");
  const correctWordLetters = correctWord.split("");
  const letterStates: LetterState[] = Array(5).fill("wrongLetter");

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === correctWordLetters[i]) {
      letterStates[i] = "correctPosition";
      guessLetters[i] = "";
      correctWordLetters[i] = "";
    }
  }
  for (let i = 0; i < 5; i++) {
    if (!guessLetters[i]) {
      continue;
    }
    if (correctWordLetters.includes(guessLetters[i])) {
      letterStates[i] = "correctLetter";
      guessLetters[i] = "";
    }
  }

  return letterStates;
};

const Word = ({ word, correctWord, submitted, empty }: WordProps) => {
  const letterStates = getLetterStates(word ?? "", correctWord);
  return (
    <div className={styles.wordWrapper}>
      {word?.split("").map((letter, index) => (
        <LetterCard
          key={letter + index}
          letter={!empty ? letter : " "}
          state={submitted ? letterStates[index] : "activeGuess"}
        />
      ))}
      {!word && (
        <>
          <LetterCard />
        </>
      )}
    </div>
  );
};

export default Word;
