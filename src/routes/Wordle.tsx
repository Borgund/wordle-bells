import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { Word, WordleHelp } from "../components";
import useSound from "use-sound";
import achievementbell from "../assets/sounds/achievementbell.wav";
import keySound from "../assets/sounds/typewriterclick.wav";
import enterSound from "../assets/sounds/typewriterreturnbell.wav";
import { allWords } from "../words";
import { useWordleContext } from "../WordleContext";
import styles from "./Wordle.module.scss";
import { getLetterStates } from "../components/word/Word";
import { usePocketStore } from "../stores/pocketStore";

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

export const Wordle = () => {
  const [getData, isLoading] = usePocketStore((s) => [s.getData, s.isLoading]);
  getData();
  const { gameState, saveWordleDay, isMuted } = useWordleContext();
  const { wordList } = usePocketStore();
  console.log(wordList);
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
  const initialIndex = attempts.filter((x) => x.trim().length > 0).length;
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
  const [isDone, setIsDone] = useState(activeGameState?.isCompleted ?? false);

  const maxAttempts = 6;

  //const WORDLIST = import.meta.env.VITE_WORDLIST || "";

  //const WORDLIST_PARSED = WORDLIST && JSON.parse(WORDLIST);
  //const todaysWord = WORDLIST_PARSED[parsedDay - 1] || "WORDS";
  console.log("Parsed day:", parsedDay);
  const filteredWordList = wordList.filter(({ slug }) => {
    console.log("infilter:", slug, parsedDay);
    return slug === "" + parsedDay;
  });
  const { word, hint } = filteredWordList[0]?.body ?? {};
  console.log(word, hint);
  const todaysWord = word?.toUpperCase();
  const [play] = useSound(achievementbell, volume);
  const [playKey] = useSound(keySound, volume);
  const [playEnter] = useSound(enterSound, volume);
  const isCorrect = () =>
    activeGuess === todaysWord || attempts.includes(todaysWord);

  const validateAttempt = () => {
    const testAttempts = activeIndex < maxAttempts;
    const testLength = activeGuess.length === 5;
    const testWord = allWords.includes(activeGuess.toLowerCase());
    return testAttempts && testLength && testWord;
  };

  const saveAttempt = () => {
    const valid = validateAttempt();

    if (!valid) {
      return;
    }
    const nextActiveIndex = activeIndex + 1;
    const newAttempts = [...attempts];
    newAttempts[activeIndex] = activeGuess;
    setAttempts(newAttempts);
    saveWordleDay(
      {
        attempts: newAttempts,
        isCompleted: isCorrect() || nextActiveIndex === maxAttempts,
        isSuccessful: isCorrect(),
      },
      parsedDay
    );

    if (isCorrect()) {
      setIsDone(true);
      play();
    } else {
      setActiveIndex(nextActiveIndex);
      playEnter();
      if (nextActiveIndex === maxAttempts) {
        setIsDone(true);
      }
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

  const emojiAttempt = (word: string): string => {
    const letterStates = getLetterStates(word, todaysWord);
    return letterStates
      .map((letterState) => {
        switch (letterState) {
          case "correctPosition":
            return "🟩";
          case "correctLetter":
            return "🟨";
          default:
            return "🟥";
        }
      })
      .toString()
      .replaceAll(",", "");
  };

  const emojify = () => {
    return attempts
      .filter((attempt) => attempt !== "     ")
      .map((attempt) => emojiAttempt(attempt))
      .join("\n");
  };

  const handleCopyResults = () => {
    const text = `My result from the ${day}. door was: \n${emojify()} \nSee if you can beat that at: \n${
      location.href
    }`;
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  if (isLoading) return <>loading</>;

  return (
    <div>
      <Link
        to="/"
        className={styles.backButton}
        onClick={() => setShowHelp((prevState) => !prevState)}
      >
        &lt; Back
      </Link>
      <button
        className={styles.helpButton}
        onClick={() => setShowHelp((prevState) => !prevState)}
      >
        {showHelp ? "x" : "?"}
      </button>
      {showHelp && <WordleHelp />}
      {!showHelp && (
        <div className={styles.wordleGame}>
          <>
            {isDone && isCorrect() && (
              <p>Hoho! Way to go! You are correct! 🎅🏻</p>
            )}
            {isDone && !isCorrect() && (
              <p>Oh no... Too bad! Better luck tomorrow 😈</p>
            )}
            {isDone && (
              <button className={styles.copyButton} onClick={handleCopyResults}>
                Copy to clipboard
              </button>
            )}
            <p>Hint: {hint}</p>
            {!isDone && <Word word={activeGuess} />}
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
            />{" "}
          </>
        </div>
      )}
    </div>
  );
};
