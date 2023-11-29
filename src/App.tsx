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
import { CogMenu } from "./components//cogmenu/CogMenu";
import { AuthFlow } from "./components/login/AuthFlow";
import LightButton from "./components/lightButton/LightButton";
import { Avatar } from "./components/avatar/avatar";
import NukeButton from "./components/nukeButton/nukeButton";

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
      return null;
    },
    element: <Wordle />,
  },
]);

function App() {
  return (
    <div className="App">
      <AuthFlow>
        <WordleProvider>
          <header>
            <Avatar />
            <CogMenu>
              <MuteButton />
              <LightButton />
              {process.env.NODE_ENV !== "production" && <NukeButton />}
            </CogMenu>
          </header>
          <RouterProvider router={router} />
          <Snowfall style={{ zIndex: "1" }} snowflakeCount={300} />
        </WordleProvider>
      </AuthFlow>
    </div>
  );
}

export default App;
