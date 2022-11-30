import React from "react";
import { Word } from "..";

type WordleHelpProps = {};

const WordleHelp = ({}: WordleHelpProps) => {
  return (
    <>
      <h1>How to play</h1>
      <p>Guess the word in 6 attempts.</p>
      <p>Each guess must be a valid 5-letter word.</p>
      <p>
        The color of the tile will change to show how close your guess was to
        the correct word.
      </p>
      <h2>Examples</h2>
      <Word word="BANKS" correctWord="PILLS" submitted />
      <p>
        <b>S</b> is in the word and in the correct spot.
      </p>
      <Word word="PRINT" correctWord="PILLS" submitted />
      <p>
        <b>P</b> and <b>I</b> is in the word, but <b>I</b> is in the wrong spot.
      </p>
      <Word word="MONEY" correctWord="PILLS" submitted />
      <p>Here none of the letter in the word is in the correct word.</p>
      <h3>Good luck!</h3>
    </>
  );
};

export default WordleHelp;
