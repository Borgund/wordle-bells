import { useWordleContext } from "../../WordleContext";

const MuteButton = () => {
  const { nukeWordleState } = useWordleContext();
  return (
    <>
      <button onClick={nukeWordleState}>{"🗑️"}</button>
    </>
  );
};

export default MuteButton;
