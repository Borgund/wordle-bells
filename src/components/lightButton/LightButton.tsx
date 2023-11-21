import { useWordleContext } from "../../WordleContext";

const LightButton = () => {
  const { thereWillBeLight, toggleLight } = useWordleContext();
  return (
    <>
      <button
        onClick={toggleLight}
        title={thereWillBeLight ? "Sun" : "Flashlight"}
      >
        {thereWillBeLight ? "🌞" : "🔦"}
      </button>
    </>
  );
};

export default LightButton;
