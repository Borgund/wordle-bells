import { useState } from "react";
import { DoorContainer, Door } from "../components";
import CustomCountdown from "../components/countdown";
import Flash from "../components/flashlightScene";
import { useWordleContext } from "../WordleContext";
import styles from "./Home.module.scss";
import { NorthStar } from "../components/north-star/NorthStar";

const Flashlights = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <Flash.Scene on_position={setPos}>
      <Flash.Light x={pos.x} y={pos.y} s={1.5} />
    </Flash.Scene>
  );
};

export const Home = () => {
  const { gameState, thereWillBeLight } = useWordleContext();

  const calendarDays = [
    6, 19, 4, 11, 13, 1, 7, 18, 21, 17, 2, 14, 10, 15, 5, 9, 22, 24, 20, 23, 8,
    16, 3, 12,
  ];

  return (
    <>
      <NorthStar />
      {thereWillBeLight && <Flashlights />}
      <div className={styles.textWrapper}>
        <h1 className="christmasFont">Happy holidays! 🎄</h1>
        <h2>
          <CustomCountdown
            date={new Date("2023-12-24")}
            text="It's Christmas in just"
          >
            <p>It's Christmas baby! Go do something else 🎅🏻</p>
          </CustomCountdown>
        </h2>
        <p>
          !Backend presents this years advents calendar! Same procedure as every
          year 🤵🏻‍♂️🎅🏻!
        </p>
      </div>
      <DoorContainer>
        {calendarDays.map((day) => {
          const dayState = gameState?.[day];
          return (
            <Door
              key={`door_${day}`}
              number={day}
              completed={dayState?.isCompleted ?? false}
              successful={dayState?.isSuccessful ?? false}
              alreadyOpened={!!dayState ?? false}
            />
          );
        })}
      </DoorContainer>
    </>
  );
};
