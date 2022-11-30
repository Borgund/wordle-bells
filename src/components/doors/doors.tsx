import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { canOpen } from "../../utils";
import useSound from "use-sound";
import storebell from "../../assets/sounds/storebell.wav";
import Elf from "../../assets/elf.svg";
import bulb from "../../assets/bulb.svg";

import styles from "./doors.module.scss";
import { useWordleContext } from "../../WordleContext";

let dateNow = new Date();

const nth = (d: number) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const DoorContainer = ({ children }: { children: any }) => {
  const day = dateNow.getDate() + nth(dateNow.getDate());

  return <div className={styles.doorContainer}>{children}</div>;
};

export const Door = ({
  number,
  alreadyOpened,
  completed,
  successful,
}: {
  number: number;
  alreadyOpened: boolean;
  completed: boolean;
  successful?: boolean;
}) => {
  const navigate = useNavigate();

  const { isMuted } = useWordleContext();
  const volume = { volume: isMuted ? 0 : 1 };

  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [play] = useSound(storebell, volume);

  const stopShake = () => {
    setTimeout(function () {
      setShake(false);
    }, 1000);
  };

  const navigateToWordle = () => {
    setTimeout(() => {
      navigate(`/wordle/${number}`);
    }, 1000);
  };

  return (
    <div
      className={`${styles.backDoor} ${
        open || alreadyOpened ? styles.open : ""
      } ${shake ? styles.shake : ""} ${successful ? styles.successful : ""} ${
        completed && !successful ? styles.failed : ""
      }`}
      tabIndex={0}
      onClick={() => {
        if (canOpen(number)) {
          setOpen(!open);
          play();
          navigateToWordle();
        } else {
          setShake(true);
          stopShake();
        }
      }}
    >
      <div className={`${styles.elf}`}>
        {successful && (
          <img className={`${styles.elfImg}`} src={Elf} alt="An elf waving" />
        )}
        {completed && !successful && (
          <img
            className={`${styles.failImg}`}
            src={bulb}
            alt="A broken christmas ball!"
          />
        )}
      </div>
      <div className={`${styles.door}`}>
        <div className={styles.number}>{number}</div>
      </div>
    </div>
  );
};
