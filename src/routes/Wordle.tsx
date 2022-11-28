import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { Word } from "../components";

const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

export const Wordle = () => {
  const [attempts, setAttempts] = useState(["", "", "", "", "", ""]);
  const [activeGuess, setActiveGuess] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const maxAttempts = 6;

  const { day } = useParams();
  const WORDLIST = import.meta.env.VITE_WORDLIST || "";
  const WORDLIST_PARSED = WORDLIST && JSON.parse(WORDLIST);
  const todaysWord =
    WORDLIST_PARSED[Number.parseInt(day || "") - 1 || 0] || "WORDS";

  const validateAttempt = () => {
    return activeGuess.length === 5;
  };

  const saveAttempt = () => {
    const valid = validateAttempt();

    if (activeIndex === maxAttempts) {
      return;
    }
    if (valid)
      setAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts];
        newAttempts[activeIndex] = activeGuess;
        return newAttempts;
      });
    if (activeIndex < maxAttempts && valid) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
    setActiveGuess("");
  };

  const addLetterToAttempt = (letter: string) => {
    if (activeGuess.length < 5) {
      setActiveGuess((prevGuess) => prevGuess + letter.toUpperCase());
    }
  };

  const removeLetterFromAttempt = () => {
    setActiveGuess((prevGuess) => prevGuess.slice(0, -1));
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
      <p>{activeIndex < maxAttempts && <Word word={activeGuess} />}</p>
      {attempts
        .map((attempt) => <Word word={attempt} correctWord={todaysWord} />)
        .reverse()}
      <Keyboard
        theme={"hg-theme-default dark"}
        layout={keyboardLayout}
        layoutName="default"
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
