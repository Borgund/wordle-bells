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

const canOpen = (number: number) => {
  const dateNow = new Date();
  const doorDate = new Date(dateNow);
  doorDate.setMonth(11);
  doorDate.setDate(number);
  return dateNow >= doorDate;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wordle/:day",
    loader: ({ params: { day } }) => {
      const parsedNumber = Number.parseInt(day || "");
      if (!parsedNumber || !canOpen(parsedNumber)) {
        return redirect("/");
      }
    },
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
