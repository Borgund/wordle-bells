import star from "../../assets/north-star.svg";
import styles from "./NorthStar.module.scss";

export const NorthStar = () => {
  return (
    <img className={styles.star} src={star} alt="yellow shaped star"></img>
  );
};
