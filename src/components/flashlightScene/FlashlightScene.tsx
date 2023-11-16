import { ReactNode, useEffect } from "react";
import styles from "./FlashlightScene.module.scss";

const FlashlightScene = ({
  children,
  on_position,
}: {
  children: ReactNode;
  on_position: (cords: { x: number; y: number }) => void;
}) => {
  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      on_position({ x: clientX / innerWidth, y: clientY / innerHeight });
    };

    addEventListener("mousemove", handleMouseMove);

    return () => {
      removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <ul aria-hidden className={styles.flashlightScene}>
      {children}
    </ul>
  );
};

export default FlashlightScene;
