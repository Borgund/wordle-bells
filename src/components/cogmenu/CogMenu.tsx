import styles from "./CogMenu.module.scss";
import { useState } from "react";

export const CogMenu = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.cog}>
      <button onClick={() => setIsActive((old) => !old)}>
        {isActive ? "❌" : "⚙️"}
      </button>
      <div className={styles.children}>{isActive && children}</div>
    </div>
  );
};
