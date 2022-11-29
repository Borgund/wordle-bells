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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wordle/:day",
    loader: ({ params: { day } }) => {
      const parsedNumber = Number.parseInt(day || "");
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
        <Snowfall style={{ zIndex: "1" }} snowflakeCount={40} />
      </WordleProvider>
    </div>
  );
}

export default App;
