import { useState } from "react";
import reactLogo from "./assets/react.svg";
import dnbLogo from "./assets/dnb-logo.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
      </div>
    </div>
  );
}

export default App;
