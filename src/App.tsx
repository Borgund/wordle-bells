import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import dnbLogo from "./assets/dnb-logo.png";
import "./App.css";
import Snowfall from "react-snowfall";
import Countdown from "react-countdown";
import CustomCountdown from "./components/countdown";
import FancyDay from "./components/fancyDay";
import {Door, DoorContainer} from "./components/doors/doors";

function App() {
  const [attempts, setAttempts] = useState(["", "", "", "", "", ""]);
  const [activeGuess, setActiveGuess] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const today = new Date();
  const christmas = new Date("2022-12-24");
  const isBeforeChristmas = +today < +christmas;

  const calendarDays = [6, 19, 4, 11, 13, 18, 7, 1, 21, 17, 14, 5, 10, 15, 2, 9, 22, 24, 20, 23, 8, 16, 3, 12];

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

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    const letterRegex = /[a-zA-Z]/;
    if (key.length === 1 && letterRegex.test(key)) {
      if (activeGuess.length < 5) {
        setActiveGuess((prevGuess) => prevGuess + key.toUpperCase());
      }
    }
    if (key === "Enter") {
      saveAttempt();
    }
    if (key === "Backspace") {
      setActiveGuess((prevGuess) => prevGuess.slice(0, -1));
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
          <p>So it's chrismas in just:</p>
        </>
      )}
      <p>
        <CustomCountdown date={christmas}>
          <p>It's Christmas baby! Go do something else! 🎅🏻</p>
        </CustomCountdown>
      </p>
      <p>{activeGuess}</p>
      {attempts.map((attempt) => (
        <div key="attempt">{attempt}</div>
      ))}


      <DoorContainer>
        {calendarDays.map((day) => {
          return (
              <Door
                  key={`door_${day}`}
                  number={day}
              />
          )
        })}
      </DoorContainer>

      <Snowfall style={{ zIndex: "-100" }} snowflakeCount={40} />
    </div>
  );
}

export default App;
