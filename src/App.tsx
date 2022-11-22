import { useState } from "react";
import reactLogo from "./assets/react.svg";
import dnbLogo from "./assets/dnb-logo.png";
import "./App.css";
import Snowfall from "react-snowfall";
import Countdown from "react-countdown";
import CustomCountdown from "./components/countdown";
import FancyDay from "./components/fancyDay";

function App() {
  const [count, setCount] = useState(0);
  const today = new Date();
  const christmas = new Date("2022-12-24");
  const isBeforeChristmas = +today < +christmas;

  return (
    <div className="App">
      <div>
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
        <img src={dnbLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React + DNB + Wordle = ❤️</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> to get christmas cracking! 🎅🏻
        </p>
        {isBeforeChristmas && (
          <>
            <p>Today is:</p>
            <FancyDay date={today} />
            <p>So it's chrismas in:</p>
          </>
        )}
        <p>
          <CustomCountdown date={christmas}>
            <p>It's Christmas baby! Go do something else! 🎅🏻</p>
          </CustomCountdown>
        </p>
      </div>
      <Snowfall style={{ zIndex: "-100" }} snowflakeCount={40} />
    </div>
  );
}

export default App;
