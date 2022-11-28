import "./App.css";
import Snowfall from "react-snowfall";
import "react-simple-keyboard/build/css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Wordle } from "./routes/Wordle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wordle/:day",
    element: <Wordle />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Snowfall style={{ zIndex: "-100" }} snowflakeCount={40} />
    </div>
  );
}

export default App;
