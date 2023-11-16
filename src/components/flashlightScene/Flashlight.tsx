import styles from "./Flashlight.module.scss";

type PropType = { x: number; y: number; s?: number };

const FlashlightScene = ({ x, y, s }: PropType) => {
  return (
    <i
      className={styles.flashlight}
      style={{
        top: `${y * 100}%`,
        left: `${x * 100}%`,
        width: `${35 * (s ?? 1)}rem`,
        height: `${35 * (s ?? 1)}rem`,
      }}
    >
      {/*  */}
    </i>
  );
};

export default FlashlightScene;
