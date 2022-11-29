import classnames from "classnames";
import React from "react";
import styles from "./LetterCard.module.scss";

type LetterCardProps = {
  letter?: string;
  state?:
    | "submitted"
    | "correctPosition"
    | "correctLetter"
    | "wrongLetter"
    | "activeGuess";
};

const LetterCard = ({ letter, state }: LetterCardProps) => {
  const charAtZero = letter?.charAt(0);
  return (
    <div className={classnames(styles.cardWrapper, styles[state ?? ""])}>
      {charAtZero}
    </div>
  );
};

export default LetterCard;
