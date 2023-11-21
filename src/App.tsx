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
import { LoginForm } from "./components/login/LoginForm";
import { useAuth } from "./hooks/useAuth";
import LightButton from "./components/lightButton/LightButton";

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
  const { logout } = useAuth();

  return (
    <div className="App">
      <LoginForm>
        <WordleProvider>
          <RouterProvider router={router} />
          <CogMenu>
            <MuteButton />
            <LightButton />
          </CogMenu>
          <Snowfall style={{ zIndex: "1" }} snowflakeCount={300} />
        </WordleProvider>
        <button onClick={logout}>Sign out</button>
      </LoginForm>
    </div>
  );
}

export default App;
