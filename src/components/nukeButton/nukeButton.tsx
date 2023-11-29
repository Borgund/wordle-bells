import { useWordleContext } from "../../WordleContext";

const MuteButton = () => {
  const { nukeWordleState } = useWordleContext();
  return (
    <>
      <button onClick={nukeWordleState}>{"🗑️"}</button>
    </>
  );
};

export const SaveTest = () => {
  const { saveWordleDay, gameState } = useWordleContext();

  const clickHandler = () => {
    saveWordleDay(
      {
        attempts: ["HORSE", "HORSE", "HORSE", "HORSE", "HORSE"],
        isCompleted: true,
        isSuccessful: false,
      },
      1
    );
  };
  return <button onClick={clickHandler}>💾</button>;
};

export default MuteButton;
