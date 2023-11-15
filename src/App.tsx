import "./App.css";
import Snowfall from "react-snowfall";
import "react-simple-keyboard/build/css/index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./routes/Home";
import { Wordle } from "./routes/Wordle";
import { canOpen } from "./utils";
import { WordleProvider } from "./WordleContext";
import MuteButton from "./components/muteButton/MuteButton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wordle/:day",
    loader: async ({ params: { day } }) => {
      const parsedNumber = parseInt(day || "");
      if (!parsedNumber || !canOpen(parsedNumber) || parsedNumber > 24) {
        return redirect("/");
      }
    },
    element: <Wordle />,
  },
]);

function App() {
  return (
    <div className="App">
      <WordleProvider>
        <RouterProvider router={router} />
        <MuteButton />
        <Snowfall style={{ zIndex: "1" }} snowflakeCount={300} />
      </WordleProvider>
    </div>
  );
}

export default App;
