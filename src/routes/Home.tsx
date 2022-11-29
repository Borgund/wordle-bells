import {DoorContainer, Door} from "../components";
import CustomCountdown from "../components/countdown";

export const Home = () => {

  const calendarDays = [6, 19, 4, 11, 13, 1, 7, 18, 21, 17, 2, 14, 10, 15, 5, 9, 22, 24, 20, 23, 8, 16, 3, 12];

  return (
      <div className="App">
        <h1>Ho ho ho! 🎄</h1>
        <h2>It's Christmas in just{" "}
          <CustomCountdown date={new Date("2022-12-24")}>
            <p>It's Christmas baby! Go do something else 🎅🏻</p>
          </CustomCountdown>
        </h2>

        <DoorContainer>
          {calendarDays.map((day) => {
            return <Door
                key={`door_${day}`}
                number={day}
                completed={/* TODO: Get from contezt? */ day < 3}
                alreadyOpened={/* TODO: Get from contezt? */ day < 4}
            />;
          })}
        </DoorContainer>
      </div>
  );
};
