import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { Word, WordleHelp } from "../components";
import useSound from "use-sound";
import achievementbell from "../assets/sounds/achievementbell.wav";
import keySound from "../assets/sounds/typewriterclick.wav";
import enterSound from "../assets/sounds/typewriterreturnbell.wav";
import { allWords } from "../words";
import { Attempt, useWordleContext } from "../WordleContext";
import styles from "./Wordle.module.scss";
import { getLetterStates } from "../components/word/Word";
import useCollection from "../hooks/useCollection";

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

export const Wordle = () => {
  const { saveWordleAttempt, setActiveDay, wordleState, isMuted } =
    useWordleContext();
  const { day } = useParams();
  const parsedDay = Number(day);
  setActiveDay(parsedDay);

  const volume = { volume: isMuted ? 0 : 1 };
  const [showHelp, setShowHelp] = useState(false);

  const EMPTY_ATTEMTSTRING = " ".repeat(5);
  const [attempts, setAttempts] = useState<Attempt[]>();
  const [activeGuess, setActiveGuess] = useState("");

  useEffect(() => {
    setAttempts(wordleState);
    console.log("useEffect wordleState:", wordleState);
  }, [wordleState]);

  const [isDone, setIsDone] = useState(wordleState?.length === 5 ?? false);

  const maxAttempts = 5;

  //const todaysWord = WORDLIST_PARSED[parsedDay - 1] || "WORDS";
  const [play] = useSound(achievementbell, volume);
  const [playKey] = useSound(keySound, volume);
  const [playEnter] = useSound(enterSound, volume);

  const { data, error } = useCollection<{
    id: string;
    slug: string;
    body: { word: string; hint: string };
  }>({ collection: "words", filter: `slug='${day}'` });

  const todaysWord = data?.body?.word.toUpperCase() ?? "";
  const hint = data?.body?.hint ?? "";

  const isCorrect = () => {
    const guessIsCorrect = activeGuess === todaysWord;
    const attemptFilter = attempts?.filter(
      ({ attempt }) => attempt === todaysWord
    );
    const previousAttemptIsCorrect = attemptFilter && attemptFilter.length > 0;

    return guessIsCorrect || previousAttemptIsCorrect;
  };

  const validateAttempt = () => {
    const testLength = activeGuess.length === 5;
    const repeatedWord =
      attempts!.filter(({ attempt }) => attempt === activeGuess).length > 0 ??
      false;
    //const testWord = allWords.includes(activeGuess.toLowerCase())
    return testLength && !repeatedWord;
  };

  const saveAttempt = () => {
    const valid = validateAttempt();

    if (!valid) {
      return;
    }

    // const nextActiveIndex = activeIndex + 1;
    // const newAttempts = [...attempts];
    // newAttempts[activeIndex] = activeGuess;
    // setAttempts(newAttempts);
    saveWordleAttempt(activeGuess, parsedDay);
    //TODO: UPDATE LOCAL STATE? OR REFETCH!

    if (isCorrect()) {
      setIsDone(true);
      play();
    } else {
      playEnter();
      if (attempts?.length === maxAttempts) {
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
      ?.filter(({ attempt }) => attempt !== "     ")
      .map(({ attempt }) => emojiAttempt(attempt))
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

  if (error || !todaysWord || todaysWord.length !== 5) {
    return (
      <>
        <Link
          to="/"
          className={styles.backButton}
          onClick={() => setShowHelp((prevState) => !prevState)}
        >
          &lt; Back
        </Link>
        <p>
          There was an error with todays word! Please let the closest elf know.
          Or you could try{" "}
          <span style={{ textDecoration: "line-through" }}>tweeting</span>{" "}
          Xing(?) about it... ¯\_(ツ)_/¯
        </p>
      </>
    );
  }

  return (
    <div>
      {JSON.stringify(wordleState)}
      <p></p>
      {JSON.stringify({ correcrt: isCorrect(), isDone: isDone })}
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
        <>
          <p>Hint: {hint}</p>
          {isDone && isCorrect() && <p>Hoho! Way to go! You are correct! 🎅🏻</p>}
          {isDone && !isCorrect() && (
            <p>Oh no... Too bad! Better luck tomorrow 😈</p>
          )}
          {isDone && (
            <button className={styles.copyButton} onClick={handleCopyResults}>
              Copy to clipboard
            </button>
          )}
          {!isDone && <Word word={activeGuess} />}
          {attempts?.map(({ attempt }) => (
            <Word
              word={attempt}
              correctWord={todaysWord}
              submitted={attempt.length > 0}
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
