import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { Word, WordleHelp } from "../components";
import useSound from "use-sound";
import achievementbell from "../assets/sounds/achievementbell.wav";
import keySound from "../assets/sounds/typewriterclick.wav";
import enterSound from "../assets/sounds/typewriterreturnbell.wav";
import { useWordleContext } from "../WordleContext";
import styles from "./Wordle.module.scss";
import { getLetterStates } from "../components/word/Word";
import { EmptyAttempts } from "../components/word/emptyAttempt";
import { useWordleStore } from "../stores/wordleStore";
import { client } from "../pocketbase";

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

export const Wordle = () => {
  const {
    activeDay,
    setActiveDay,
    fetchGameState,
    gameState,
    activeCorrectWord,
    fetchCorrectWord,
    submitWordleAttempt,
    isLoading,
    error,
  } = useWordleStore();
  const { isMuted } = useWordleContext();
  const { day } = useParams();
  const maxAttempts = 6;

  useEffect(() => {
    if (client.authStore.isValid) {
      //fetchGameState();
      const parsedDay = Number(day);
      console.log(parsedDay, day);
      setActiveDay(parsedDay);
      fetchCorrectWord(parsedDay);
    } else {
      console.log("!valid session");
    }
  }, []);

  const volume = { volume: isMuted ? 0 : 1 };
  const [showHelp, setShowHelp] = useState(false);

  const EMPTY_ATTEMTSTRING = " ".repeat(5);
  const [activeGuess, setActiveGuess] = useState("");

  const [play] = useSound(achievementbell, volume);
  const [playKey] = useSound(keySound, volume);
  const [playEnter] = useSound(enterSound, volume);

  const filteredAttemptsList = gameState.filter(
    ({ slug }) => slug === "" + activeDay
  );

  const isCorrect =
    filteredAttemptsList.filter(
      ({ attempt }) =>
        attempt.toUpperCase() === activeCorrectWord?.body.word.toUpperCase()
    ).length > 0;

  const isDone = filteredAttemptsList.length === maxAttempts || isCorrect;

  const validateAttempt = () => {
    const testLength = activeGuess.length === 5;
    const repeatedWord =
      filteredAttemptsList.filter(({ attempt }) => attempt === activeGuess)
        .length > 0 ?? false;
    return testLength && !repeatedWord;
  };

  const saveAttempt = () => {
    const valid = validateAttempt();

    if (!valid) {
      return;
    }
    const isAboutToSolveIt =
      activeGuess === activeCorrectWord?.body.word.toUpperCase();
    const last =
      (filteredAttemptsList?.length ?? 0) + 1 === maxAttempts ||
      isCorrect ||
      isAboutToSolveIt;
    submitWordleAttempt({
      owner: client.authStore.model?.id,
      slug: "" + activeDay,
      attempt: activeGuess,
      attemptNumber: filteredAttemptsList.length + 1,
      last: last,
      isCorrect: isAboutToSolveIt,
    });
    fetchGameState();

    if (isCorrect) {
      play();
    } else {
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

  const emojiAttempt = (word: string): string => {
    const letterStates = getLetterStates(
      word,
      activeCorrectWord?.body.word.toUpperCase()
    );
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
    return filteredAttemptsList
      ?.filter(({ attempt }) => attempt !== "     ")
      .map(({ attempt }) => emojiAttempt(attempt))
      .join("\n");
  };

  const handleCopyResults = () => {
    const text = `My result from the ${activeDay}. door was: \n${emojify()} \nSee if you can beat that at: \n${
      location.href
    }`;
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  if (error) {
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
  if (isLoading) {
    return <>Loading...</>;
  }
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
        <>
          {isDone && isCorrect && <p>Hoho! Way to go! You are correct! 🎅🏻</p>}
          {isDone && !isCorrect && (
            <p>Oh no... Too bad! Better luck tomorrow 😈</p>
          )}
          {isDone && (
            <button className={styles.copyButton} onClick={handleCopyResults}>
              Copy to clipboard
            </button>
          )}
          {!isDone && <p>Hint: {activeCorrectWord?.body.hint}</p>}
          {<Word word={activeGuess} />}
          {filteredAttemptsList &&
            filteredAttemptsList.map(({ attempt }) => (
              <Word
                word={attempt}
                correctWord={activeCorrectWord?.body.word.toUpperCase()}
                submitted={attempt.length > 0}
              />
            ))}
          <EmptyAttempts
            maxAttempts={maxAttempts}
            attempts={filteredAttemptsList.length}
          />

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
