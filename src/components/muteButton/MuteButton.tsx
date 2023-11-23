import React from "react";
import { useWordleContext } from "../../WordleContext";

type MuteButtonProps = {};

const MuteButton = ({}: MuteButtonProps) => {
  const { isMuted, toggleMute } = useWordleContext();
  return (
    <>
      <button onClick={toggleMute} title={isMuted ? "unmute" : "mute"}>
        {isMuted ? "🔇" : "🔈"}
      </button>
    </>
  );
};

export default MuteButton;
