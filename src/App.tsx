import { useState } from "react";
import reactLogo from "./assets/react.svg";
import dnbLogo from "./assets/dnb-logo.png";
import "./App.css";
import Snowfall from "react-snowfall";
import Countdown from "react-countdown";
import CustomCountdown from "./components/countdown";
import FancyDay from "./components/fancyDay";

function App() {
  const today = new Date();
  const christmas = new Date("2022-12-24");
  const isBeforeChristmas = +today < +christmas;

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

      <Snowfall style={{ zIndex: "-100" }} snowflakeCount={40} />
    </div>
  );
}

export default App;
