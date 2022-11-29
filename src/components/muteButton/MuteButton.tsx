import React from "react";
import { useWordleContext } from "../../WordleContext";
import styles from "./MuteButton.module.scss";

type MuteButtonProps = {};

const MuteButton = ({}: MuteButtonProps) => {
  const { isMuted, toggleMute } = useWordleContext();
  return (
    <>
      <button
        className={styles.button}
        onClick={toggleMute}
        title={isMuted ? "unmute" : "mute"}
      >
        {isMuted ? "🔇" : "🔈"}
      </button>
    </>
  );
};

export default MuteButton;
