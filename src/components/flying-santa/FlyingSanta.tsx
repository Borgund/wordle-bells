import elv from "../../assets/elf.svg";
import star from "./star.svg";
import styles from "./FlyingSanta.module.scss";
export const FlyingSanta = () => {
  return (
    <div className={styles.containerStar}>
      <img className={styles.star} src={star} alt="yellow shaped star"></img>
      <img className={styles.star} src={star} alt="yellow shaped star"></img>
      <img className={styles.star} src={star} alt="yellow shaped star"></img>
    </div>
  );
};
