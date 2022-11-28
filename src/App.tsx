import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import dnbLogo from "./assets/dnb-logo.png";
import "./App.css";
import Snowfall from "react-snowfall";
import Countdown from "react-countdown";
import CustomCountdown from "./components/countdown";
import FancyDay from "./components/fancyDay";
import { Door, DoorContainer } from "./components/doors/doors";
import LetterCard from "./components/letterCard";
import Word from "./components/word";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const layout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {enter}",
    "Z X C V B N M {bksp}",
  ],
};

function App() {
  const [attempts, setAttempts] = useState(["", "", "", "", "", ""]);
  const [activeGuess, setActiveGuess] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const today = new Date();
  const christmas = new Date("2022-12-24");
  const isBeforeChristmas = +today < +christmas;
  const todaysWord = "JOLLY";

  const calendarDays = [
    6, 19, 4, 11, 13, 18, 7, 1, 21, 17, 14, 5, 10, 15, 2, 9, 22, 24, 20, 23, 8,
    16, 3, 12,
  ];

  const saveAttempt = () => {
    if (activeGuess.length === 5)
      setAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts];
        newAttempts[activeIndex] = activeGuess;
        return newAttempts;
      });
    if (activeIndex < 5) {
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
    <div className="App">
      <div>
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
        <img src={dnbLogo} className="logo" alt="DNB logo" />
      </div>
      <h1>Vite + React + DNB + Wordle = ❤️</h1>
      <p>
        Edit <code>src/App.tsx</code> to get christmas cracking! 🎅🏻
      </p>
      {isBeforeChristmas && (
        <>
          <p>Today is:</p>
          <FancyDay date={today} />
          <p>So it"s chrismas in just:</p>
        </>
      )}
      <p>
        <CustomCountdown date={christmas}>
          <p>It"s Christmas baby! Go do something else! 🎅🏻</p>
        </CustomCountdown>
      </p>
      <p>{<Word word={activeGuess} />}</p>
      {attempts.map((attempt) => (
        <Word word={attempt} correctWord={todaysWord} />
      ))}
      <Keyboard
        theme={"hg-theme-default dark"}
        layout={layout}
        layoutName="default"
        onKeyPress={onKeyPress}
      />
      <DoorContainer>
        {calendarDays.map((day) => {
          return <Door key={`door_${day}`} number={day} />;
        })}
      </DoorContainer>

      <Snowfall style={{ zIndex: "-100" }} snowflakeCount={40} />
    </div>
  );
}

export default App;
