import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { canOpen } from "../../utils";
import useSound from "use-sound";
import storebell from "../..//assets/sounds/storebell.wav";

import styles from "./doors.module.scss";

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

export const DoorContainer = (props: { children: any }) => {
  const day = dateNow.getDate() + nth(dateNow.getDate());

  return <div className={styles.doorContainer}>{props.children}</div>;
};

export const Door = (props: { number: number }) => {
  const navigate = useNavigate();

  const { number } = props;

  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [play] = useSound(storebell);

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
      className={`${styles.backDoor} ${open ? styles.open : ""} ${
        shake ? styles.shake : ""
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
      <div className={`${styles.door}`}>
        <div className={styles.number}>{number}</div>
      </div>
    </div>
  );
};
