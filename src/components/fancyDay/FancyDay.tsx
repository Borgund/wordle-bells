import React from "react";
import styles from "./FancyDay.module.scss";

type FancyDayProps = { date: Date; showYear?: boolean };

const FancyDay = ({ date, showYear }: FancyDayProps) => {
  const dayString = date.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  const dateString = date.toLocaleDateString("en-GB", {
    day: "numeric",
  });
  const monthString = date.toLocaleDateString("en-GB", {
    month: "long",
  });
  const yearString = date.toLocaleDateString("en-GB", {
    year: "numeric",
  });
  return (
    <div className={styles.fancyDay}>
      <div className={styles.topBar}>
        <p className={styles.day}>{dayString}</p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.date}>{dateString}</div>
        <div className={styles.month}>{monthString}</div>
      </div>
      {showYear && (
        <div className={styles.bottomBar}>
          <p className={styles.year}>{yearString}</p>
        </div>
      )}
    </div>
  );
};

export default FancyDay;
