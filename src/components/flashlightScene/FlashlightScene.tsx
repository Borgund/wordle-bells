import { ReactNode } from "react";
import styles from "./FlashlightScene.module.scss";

const FlashlightScene = ({ children }: { children: ReactNode }) => {
  return (
    <ul aria-hidden className={styles.flashlightScene}>
      {children}
    </ul>
  );
};

export default FlashlightScene;
