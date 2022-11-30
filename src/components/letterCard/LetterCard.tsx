import classnames from "classnames";
import React from "react";
import styles from "./LetterCard.module.scss";

export type LetterState =
  | "submitted"
  | "correctPosition"
  | "correctLetter"
  | "wrongLetter"
  | "activeGuess";

type LetterCardProps = {
  letter?: string;
  state?: LetterState;
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
