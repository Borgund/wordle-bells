import reactLogo from "../assets/react.svg";
import dnbLogo from "../assets/dnb-logo.png";
import { FancyDay, DoorContainer, Door } from "../components";
import CustomCountdown from "../components/countdown";

export const Home = () => {
  const today = new Date();
  const christmas = new Date("2022-12-24");
  const isBeforeChristmas = +today < +christmas;

  const calendarDays = [
    6, 19, 4, 11, 13, 18, 7, 1, 21, 17, 14, 5, 10, 15, 2, 9, 22, 24, 20, 23, 8,
    16, 3, 12,
  ];

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
      <DoorContainer>
        {calendarDays.map((day) => {
          return <Door key={`door_${day}`} number={day} />;
        })}
      </DoorContainer>
    </div>
  );
};
