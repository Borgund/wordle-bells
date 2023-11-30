import { useEffect, useState } from "react";
import star from "../../assets/north-star.svg";
import pentagram from "../../assets/pentagram.svg";
import styles from "./NorthStar.module.scss";
import { client } from "../../pocketbase";

export const NorthStar = () => {
  const [satanMode, setSatanMode] = useState(false);

  const getLastAttempt = async (type: string) => {
    try {
      const result = await client
        .collection("attempts")
        .getFirstListItem(`attempt="${type}"`, {
          sort: "-created",
        });
      return result.created;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const isSatanMode = async () => {
    const [lastJesusAttempt, lastSatanAttempt] = await Promise.all([
      getLastAttempt("JESUS"),
      getLastAttempt("SATAN"),
    ]);
    const satanCheck =
      lastJesusAttempt === ""
        ? lastSatanAttempt !== ""
        : new Date(lastSatanAttempt) > new Date(lastJesusAttempt);
    setSatanMode(satanCheck);
  };

  useEffect(() => {
    isSatanMode();
    const unsubscribe = client
      .collection("attempts")
      .subscribe("*", isSatanMode);

    return () => {
      client.collection("attempts").unsubscribe("*");
    };
  }, []);

  useEffect(() => {
    const bodyStyle = satanMode
      ? `
        --color-x-mas-blue-sky: var(--color-red-dark);
        filter: blur(0.1px) contrast(1.4);
        transform: scale(0.9) rotate(3deg);
      `
      : "";

    // @ts-ignore
    document.body.style = bodyStyle;

    return () => {
      // @ts-ignore
      document.body.style = "";
    };
  }, [satanMode]);

  return (
    <img
      className={styles.star}
      src={satanMode ? pentagram : star}
      alt="yellow shaped star"
    />
  );
};
