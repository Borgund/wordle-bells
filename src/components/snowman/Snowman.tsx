import Lottie from "lottie-react";
import snowmanAnimation from "../../../src/assets/snowman_animation.json";
import styles from "./Snowman.module.scss";

export const Snowman = () => {
    return (
        <div className={styles.snowman}>
           <Lottie animationData={snowmanAnimation} loop={true} />
       </div>
    );
};