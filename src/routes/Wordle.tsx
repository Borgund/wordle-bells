import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { Word, WordleHelp } from "../components";
import useSound from "use-sound";
import achievementbell from "../assets/sounds/achievementbell.wav";
import keySound from "../assets/sounds/typewriterclick.wav";
import enterSound from "../assets/sounds/typewriterreturnbell.wav";
import { allWords } from "../words";
import { useWordleContext } from "../WordleContext";

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

export const Wordle = () => {
  const { gameState, saveWordleDay, isMuted } = useWordleContext();
  const { day } = useParams();
  const parsedDay = Number(day);
  const activeGameState = gameState[parsedDay];
  const volume = { volume: isMuted ? 0 : 1 };
  const [showHelp, setShowHelp] = useState(false);

  const [attempts, setAttempts] = useState(
    activeGameState?.attempts ?? [
      "     ",
      "     ",
      "     ",
      "     ",
      "     ",
      "     ",
    ]
  );
  const [activeGuess, setActiveGuess] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDone, setIsDone] = useState(activeGameState?.isCompleted ?? false);

  const maxAttempts = 6;

  const WORDLIST = import.meta.env.VITE_WORDLIST || "";
  const WORDLIST_PARSED = WORDLIST && JSON.parse(WORDLIST);
  const todaysWord = WORDLIST_PARSED[parsedDay - 1] || "WORDS";
  const [play] = useSound(achievementbell, volume);
  const [playKey] = useSound(keySound, volume);
  const [playEnter] = useSound(enterSound, volume);

  const validateAttempt = () => {
    const testLength = activeGuess.length === 5;
    const testWord =
      allWords.includes(activeGuess.toLowerCase()) ||
      WORDLIST_PARSED.includes(activeGuess);
    return testLength && testWord;
  };
  const isCorrect = () => {
    return activeGuess === todaysWord;
  };

  const saveAttempt = () => {
    const valid = validateAttempt();

    if (activeIndex === maxAttempts || isDone || !valid) {
      return;
    }

    const correct = isCorrect();
    const nextActiveIndex = activeIndex + 1;

    const newAttempts = [...attempts];
    newAttempts[activeIndex] = activeGuess;
    setAttempts(newAttempts);
    saveWordleDay(
      {
        attempts: newAttempts,
        isCompleted: correct || nextActiveIndex === maxAttempts,
        isSuccessful: correct,
      },
      parsedDay
    );

    if (correct) {
      setIsDone(true);
      play();
    } else {
      setActiveIndex(nextActiveIndex);
      playEnter();
    }

    setActiveGuess("");
  };

  const addLetterToAttempt = (letter: string) => {
    if (activeGuess.length < 5 && !isDone) {
      playKey();
      setActiveGuess((prevGuess) => prevGuess + letter.toUpperCase());
    }
  };

  const removeLetterFromAttempt = () => {
    setActiveGuess((prevGuess) => prevGuess.slice(0, -1));
  };
  const removeAllLettersFromAttempt = () => {
    setActiveGuess("");
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    const letterRegex = /[a-zA-Z]/;
    if (key.length === 1 && letterRegex.test(key)) {
      addLetterToAttempt(key);
    }
    if (key === "Enter") {
      saveAttempt();
    }
    if (key === "Backspace") {
      removeLetterFromAttempt();
    }
    if (key === "Escape") {
      if (showHelp) {
        setShowHelp(false);
      } else {
        removeAllLettersFromAttempt();
      }
    }
  };

  const onKeyPress = (button: string) => {
    if (button === "{bksp}") {
      removeLetterFromAttempt();
    } else if (button === "{enter}") {
      saveAttempt();
    } else {
      addLetterToAttempt(button);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div>
      <button
        style={{ position: "absolute", top: "1rem" }}
        onClick={() => setShowHelp((prevState) => !prevState)}
      >
        {showHelp ? "x" : "?"}
      </button>
      {showHelp && <WordleHelp />}
      {!showHelp && (
        <>
          <p>{!isDone && <Word word={activeGuess} />}</p>
          {attempts.map((attempt) => (
            <Word
              word={attempt}
              correctWord={todaysWord}
              submitted={attempt.trim().length > 0}
            />
          ))}
          <Keyboard
            theme={"hg-theme-default dark"}
            layout={keyboardLayout}
            layoutName="default"
            onKeyPress={onKeyPress}
          />
        </>
      )}
    </div>
  );
};
